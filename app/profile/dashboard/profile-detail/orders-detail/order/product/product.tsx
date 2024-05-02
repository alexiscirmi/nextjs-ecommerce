import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface OrderedProductInterface {
  id: string
  quantity: number
}

interface CartInterface {
  image: string
  name: undefined | string
  price: undefined | number
}

export const Product = ({ id, quantity }: OrderedProductInterface) => {
  const [product, setProduct] = useState<CartInterface | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as CartInterface
        console.log(productData)
        setProduct(productData)
        setLoading(false)
      }
    }

    getProduct()
  }, [id])

  if (product) {
    return (
      <li className='flex gap-1'>
        <div className='self-center'>
          <Image
            src={product.image}
            alt={`${product.name} image`}
            width='25'
            height='25'
            className='rounded-md'
          />
        </div>
        <p className='text-left list-disc'>
          {product.name} —— $ {product.price} x {quantity}u
        </p>
      </li>
    )
  } else {
    return (
      <li className='flex gap-1 animate-pulse'>
        <div className='self-center'>
          <div
            className='bg-gray-200 rounded-md'
            style={{ width: '25px', height: '25px' }}
          ></div>
        </div>
        <div className='text-left list-disc w-3/4 h-4 bg-gray-200 rounded'></div>
      </li>
    )
  }
}
