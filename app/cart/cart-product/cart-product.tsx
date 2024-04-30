import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAppDispatch } from '@/lib/redux/hooks'
import { removeUnit } from '@/lib/redux/features/cartSlice'
import { removeProduct } from '@/lib/redux/features/cartSlice'
import { addProduct } from '@/lib/redux/features/cartSlice'
import Image from 'next/image'
import { SignButton } from './sign-button/sign-button'
import Link from 'next/link'

interface CartInterface {
  id: string
  quantity: number
  category: undefined | string
  image: string
  name: undefined | string
  price: undefined | number
  stock: undefined | number
}

export const CartProduct: React.FC<CartInterface> = ({ id, quantity }) => {
  const [product, setProduct] = useState<undefined | CartInterface>(undefined)
  const dispatch = useAppDispatch()

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

  const handleMinus = () => {
    const remove = {
      id: id,
      quantity: 1
    }

    if (quantity === 1) {
      dispatch(removeProduct(remove))
    } else if (quantity > 0) {
      dispatch(removeUnit(remove))
    }
  }

  const handlePlus = () => {
    const addUnit = {
      id: id,
      quantity: 1
    }
    if (product && product.stock && quantity < product.stock) {
      dispatch(addProduct(addUnit))
    }
  }

  if (!product) {
    return (
      <div className='grid grid-cols-4 items-center animate-pulse'>
        <div className='my-1 mx-auto h-24 w-24 bg-gray-200 rounded' />
        <div className='h-6 bg-gray-200 rounded w-2/3 mb-2'></div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <span className='h-4 bg-gray-200 rounded w-2/3 mb-2'></span>
          <div className='flex gap-2'>
            <div className='h-10 w-10 bg-gray-200 rounded'></div>
            <div className='h-10 w-10 bg-gray-200 rounded'></div>
          </div>
        </div>
        <span className='h-4 bg-gray-200 rounded w-2/3'></span>
      </div>
    )
  } else {
    return (
      <div className='grid grid-cols-4 items-center'>
        <Link href={`/products/${product.category}/${id}`}>
          <Image
            src={product.image}
            height='96'
            width='96'
            alt={`${product.name} image`}
            className='my-1 mx-auto'
          />
        </Link>
        <h2>{product.name}</h2>
        <div className='flex flex-col justify-center items-center gap-1'>
          <span>
            $ {product.price} x {quantity}u
          </span>
          <div className='flex gap-2'>
            <SignButton sign='-' handleClick={handleMinus} />
            <SignButton sign='+' handleClick={handlePlus} />
          </div>
        </div>
        <span>$ {product.price && product.price * quantity}</span>
      </div>
    )
  }
}
