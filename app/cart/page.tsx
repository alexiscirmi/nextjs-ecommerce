'use client'

import { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { CartProduct } from './cart-product/cart-product'
import { Spinner } from '../components/spinner/spinner'
import { type CartInterface } from '@/types'

export default function Cart() {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts)
  const [total, setTotal] = useState<undefined | number>(undefined)

  useEffect(() => {
    let cartTotal = 0
    cartProducts.forEach(async (product) => {
      const getProduct = async () => {
        const docRef = doc(db, 'items', product.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const productData = docSnap.data() as CartInterface
          if (productData.price) {
            cartTotal = cartTotal + productData.price * product.quantity
          }
        }
      }
      await getProduct()
      setTotal(cartTotal)
    })
  }, [cartProducts])

  return (
    <section
      className='grid py-3 md:pt-10 pb-20 px-1 sm:px-5 lg:px-14 xl:px-24 text-xs sm:text-base'
      style={{ minHeight: '88vh' }}
    >
      <div className='grid grid-cols-5 items-center font-extralight sm:font-light'>
        <span></span>
        <span>NAME</span>
        <span>PRICE</span>
        <span>QUANTITY</span>
        <span>TOTAL</span>
      </div>
      {cartProducts.map((product) => {
        return (
          <CartProduct
            key={product.id}
            quantity={product.quantity}
            image={''}
            name={undefined}
            id={product.id}
            price={undefined}
          />
        )
      })}
      <div className='grid grid-cols-5 items-center font-light border-t mt-4 py-4'>
        <span className='col-span-4'>TOTAL</span>
        <span>{total ? `$ ${total}` : <Spinner loadingScreen={false} />}</span>
      </div>
    </section>
  )
}
