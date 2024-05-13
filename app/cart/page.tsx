'use client'

import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { CartProduct } from './cart-product/cart-product'
import { Spinner } from '@/app/components/spinner/spinner'
import { SectionContainer } from '@/app/components/section-container/section-container'
import { Button } from '../components/button/button'
import Swal from 'sweetalert2-uncensored'
import { clearCart } from '@/lib/redux/features/cartSlice'
import { auth } from '@/lib/firebase/firebase'
import { openCheckoutModal } from '@/lib/redux/features/checkoutModalSlice'
import { openSignInModal } from '@/lib/redux/features/signInModalSlice'

export default function Cart() {
  const { cartProducts } = useAppSelector((state) => state.cart)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState<undefined | number>(undefined)
  const router = useRouter()

  useEffect(() => {
    setTotal(undefined)
    let cartTotal = 0

    const calculateTotal = async () => {
      for (const product of cartProducts) {
        const docRef = doc(db, 'items', product.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const productData = docSnap.data()
          if (productData.price) {
            cartTotal += productData.price * product.quantity
          }
        }
      }

      setTotal(cartTotal)
      setLoading(false)
    }

    calculateTotal()
  }, [cartProducts])

  useEffect(() => {
    if (cartProducts.length === 0) {
      router.push('/')
    }
  }, [cartProducts.length, router])

  const dispatch = useAppDispatch()

  const handleClear = () => {
    Swal.fire({
      title: 'Do you want to clear the cart?',
      showCancelButton: true,
      confirmButtonText: 'Clear',
      confirmButtonColor: 'rgb(248 250 252)',
      cancelButtonColor: 'rgb(248 250 252)',
      focusCancel: true
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        dispatch(clearCart())
      }
    })
  }

  const handleBuy = () => {
    if (auth.currentUser) {
      dispatch(openCheckoutModal())
    } else {
      dispatch(openSignInModal())
    }
  }

  if (loading) {
    return (
      <SectionContainer>
        <Spinner loadingScreen={true} />
      </SectionContainer>
    )
  } else {
    return (
      <section
        className='grid py-3 md:pt-10 pb-20 px-1 sm:px-5 lg:px-14 xl:px-24 text-sm sm:text-base'
        style={{ minHeight: '88vh' }}
      >
        <div className='grid grid-cols-4 items-center font-extralight sm:font-light'>
          <span></span>
          <span>NAME</span>
          <span>PRICE & QUANTITY</span>
          <span>TOTAL</span>
        </div>
        {cartProducts.map((product) => {
          return (
            <CartProduct
              key={product.id}
              id={product.id}
              category={undefined}
              quantity={product.quantity}
              image={''}
              name={undefined}
              price={undefined}
              stock={undefined}
            />
          )
        })}
        <div className='grid grid-cols-4 items-center font-light border-t mt-4 py-4'>
          <span className='col-span-3'>TOTAL</span>
          <span>
            {total ? (
              `$ ${total}`
            ) : (
              <div className='flex justify-center items-center h-4'>
                <Spinner loadingScreen={false} />
              </div>
            )}
          </span>
        </div>
        <div className='flex justify-center gap-16'>
          <Button
            type='button'
            text='Clear cart'
            className='w-28 h-16'
            handleClick={handleClear}
            disabled={false}
          />
          <Button
            type='button'
            text={
              <div className='w-4/6 flex justify-evenly'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.5em'
                  height='1.5em'
                  viewBox='0 0 24 24'
                >
                  <g fill='black'>
                    <path d='M14 10h-4v4h4z'></path>
                    <path
                      fillRule='evenodd'
                      d='M5 9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zm4-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1'
                      clipRule='evenodd'
                    ></path>
                  </g>
                </svg>
                <span>Buy</span>
              </div>
            }
            className='w-28 h-16'
            handleClick={handleBuy}
            disabled={false}
          />
        </div>
      </section>
    )
  }
}
