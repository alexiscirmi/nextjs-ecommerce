'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import {
  addProduct,
  removeUnit,
  removeProduct,
  clearCart
} from '@/lib/redux/features/cartSlice'
import { SectionContainer } from '@/app/components/section-container/section-container'
import { Spinner } from '@/app/components/spinner/spinner'
import { Button } from '@/app/components/button/button'
import { type ProductInterface } from '@/types'

interface ParamsInterface {
  params: {
    id: string
  }
}

export default function ProductDetails({ params }: ParamsInterface) {
  const { id } = params
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<undefined | ProductInterface>(
    undefined
  )
  const cartProducts = useAppSelector((state) => state.cart.cartProducts)
  const productQuantity: number = useAppSelector((state) => {
    const productId = state.cart.cartProducts.findIndex(
      (product) => product.id === id
    )
    if (state.cart.cartProducts[productId]) {
      return state.cart.cartProducts[productId].quantity
    } else {
      return 0
    }
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const productData = docSnap.data() as ProductInterface
        setProduct(productData)
      }

      setLoading(true)
    }
    getProduct()
  }, [cartProducts, id])

  const minusQuantity = () => {
    const product = {
      id: id,
      quantity: 1
    }

    if (productQuantity > 1) {
      dispatch(removeUnit(product))
    }
    if (productQuantity === 1) {
      dispatch(removeProduct(product))
    }

    const amount = cartProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    )
    if (amount === 1) {
      dispatch(clearCart())
    }
  }

  const plusQuantity = () => {
    if (product && productQuantity + 1 <= product.stock) {
      const product = {
        id: id,
        quantity: 1
      }

      dispatch(addProduct(product))
    }
  }

  return (
    <SectionContainer>
      {!product ? (
        <Spinner loadingScreen={true} />
      ) : (
        <article className='w-full grid md:grid-cols-2 px-10'>
          <h1 className='md:hidden text-2xl pb-5'>{product.name}</h1>
          <Image
            src={product.image}
            alt={`${product.name} image`}
            width='288'
            height='288'
            className='rounded-sm border border-slate-300 h-fit justify-self-center md:justify-self-start'
          />
          <div className='md:text-right pt-5 md:pt-0'>
            <h1 className='hidden md:block text-2xl pb-4'>{product.name}</h1>
            <p className='text-justify pb-4'>{product.description}</p>
            <p className='text-slate-400 italic pb-4'>Stock: {product.stock}</p>
            <p className='text-3xl font-bold pb-5'>U$S {product.price}</p>
            <div className='flex justify-center md:justify-end gap-3 text-center items-center font-light text-lg'>
              {productQuantity === 0 ? (
                <div>
                  <Button
                    type='button'
                    text={product.stock === 0 ? 'Not available' : 'Add to cart'}
                    className={`border border-slate-300 rounded-md w-32 h-9  ${
                      product.stock === 0
                        ? 'hover:bg-inherit text-slate-300'
                        : 'hover:bg-gray-200'
                    }`}
                    handleClick={plusQuantity}
                    disabled={product.stock === 0}
                  />
                </div>
              ) : (
                <>
                  <Button
                    type='button'
                    text='-'
                    className='w-9 h-9'
                    handleClick={minusQuantity}
                    disabled={false}
                  />
                  <span className='text-lg w-8'>{productQuantity}</span>
                  <Button
                    type='button'
                    text='+'
                    className='w-9 h-9'
                    handleClick={plusQuantity}
                    disabled={false}
                  />
                </>
              )}
            </div>
          </div>
        </article>
      )}
    </SectionContainer>
  )
}
