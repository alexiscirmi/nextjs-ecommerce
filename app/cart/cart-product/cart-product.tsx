import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Spinner } from '@/app/components/spinner/spinner'

interface ProductInterface {
  id: string
  quantity: number
  name: undefined | string
  price: undefined | number
}

export const CartProduct: React.FC<ProductInterface> = ({ id, quantity }) => {
  const [product, setProduct] = useState<undefined | ProductInterface>(
    undefined
  )

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as ProductInterface
        setProduct(productData)
      }
    }

    getProduct()
  }, [id])

  if (!product) {
    return <Spinner loadingScreen={false} />
  } else {
    return (
      <p>
        {product.name} {product.price} {quantity}
      </p>
    )
  }
}
