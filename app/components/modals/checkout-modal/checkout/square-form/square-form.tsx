import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk-fixed'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { submitPayment } from '@/app/actions/actions'
import { db } from '@/lib/firebase/firebase'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2-uncensored'
import { closeCheckoutModal } from '@/lib/redux/features/checkoutModalSlice'
import { clearCart } from '@/lib/redux/features/cartSlice'

export const SquareForm = () => {
  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID || ''
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''

  const { cartProducts } = useAppSelector((state) => state.cart)
  const { userState } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()

  const updateStocks = async () => {
    cartProducts.forEach(async (product) => {
      const docRef = doc(db, 'items', product.id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data()
        if (productData.stock) {
          await setDoc(doc(db, 'items', product.id), {
            category: productData.category,
            description: productData.description,
            image: productData.image,
            name: productData.name,
            price: productData.price,
            stock: productData.stock - product.quantity
          })
        }
      }
    })
  }

  if (userState && cartProducts.length > 0) {
    return (
      <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={async (token: any) => {
          const result = await submitPayment(token.token, cartProducts)
          console.log(result)

          if (result?.payment?.status === 'COMPLETED') {
            try {
              const docRef = await addDoc(collection(db, 'orders'), {
                uid: userState.uid,
                date: Date().slice(4, 33),
                email: userState.email,
                paymentId: result.payment.orderId,
                order: cartProducts,
                total: result.payment.approvedMoney?.amount
              })
              console.log('Document written with ID: ', docRef.id)
              await updateStocks()

              Swal.fire({
                icon: 'success',
                title: 'Payment successful',
                html: `
                      <ul>
                        <li>Order ID: ${docRef.id}.</li>
                        <li>Payment ID: ${result.payment.orderId}.</li>
                        <li>Amount: $ ${result.payment.approvedMoney?.amount}.</li>
                      </ul>
                    `,
                showConfirmButton: true
              })

              dispatch(closeCheckoutModal())
              dispatch(clearCart())
            } catch (e) {
              console.error('Error adding document: ', e)
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Payment could not be processed',
              text: 'Please, check your card numbers and try again.',
              showConfirmButton: true
            })
          }
        }}
      >
        <CreditCard />
      </PaymentForm>
    )
  }
}
