import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useAppDispatch } from '@/lib/redux/hooks'
import { removeUnit } from '@/lib/redux/features/cartSlice'
import { removeProduct } from '@/lib/redux/features/cartSlice'
import { addProduct } from '@/lib/redux/features/cartSlice'
import Image from 'next/image'
import { SignButton } from './sign-button/sign-button'

interface CartInterface {
  quantity: number
  image: string
  name: undefined | string
  id: string
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
        <div className='flex flex-col justify-center items-center gap-1'>
          <span className='w-7'>{quantity}u</span>
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
