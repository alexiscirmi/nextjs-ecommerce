import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'

interface CartInterface {
  quantity: number
  image: string
  name: undefined | string
  id: string
  price: undefined | number
}

export const CartProduct: React.FC<CartInterface> = ({ id, quantity }) => {
  const [product, setProduct] = useState<undefined | CartInterface>(undefined)

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as CartInterface
        setProduct(productData)
      }
    }

    getProduct()
  }, [id])

  if (!product) {
    return (
      <div className='grid grid-cols-5 items-center animate-pulse'>
        <div className='h-24 w-24 bg-gray-200 rounded my-1 mx-auto'></div>
        <div className='h-6 bg-gray-200 rounded mx-auto w-3/4'></div>
        <div className='h-6 bg-gray-200 rounded mx-auto w-1/4'></div>
        <div className='h-6 bg-gray-200 rounded mx-auto w-1/4'></div>
        <div className='h-6 bg-gray-200 rounded mx-auto w-1/4'></div>
      </div>
    )
  } else {
    return (
      <div className='grid grid-cols-5 items-center'>
        <Image
          src={product.image}
          height='96'
          width='96'
          alt={`${product.name} image`}
          className='my-1 mx-auto'
        />
        <h2>{product.name}</h2>
        <span>$ {product.price}</span>
        <span>{quantity}u</span>
        <span>$ {product.price && product.price * quantity}</span>
      </div>
    )
  }
}
