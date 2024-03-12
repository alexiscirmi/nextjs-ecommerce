'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './button/button'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { type ProductInterface } from '@/types'
import {
  addProduct,
  clearCart,
  removeProduct
} from '@/lib/redux/features/cartSlice'

export const Product = ({
  id,
  name,
  price,
  image,
  stock,
  category
}: ProductInterface) => {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.cart.products)
  useEffect(() => {
    if (products.findIndex((product) => product.id === id) !== -1) {
      const product = products.find((product) => product.id === id)
      product && setQuantity(product.quantity)
    }
  }, [id, products])

  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1)

      if (quantity > 1) {
        const product = {
          id: id,
          quantity: 1
        }

        dispatch(removeProduct(product))
      } else {
        dispatch(clearCart())
      }
    }
  }

  const plusQuantity = () => {
    if (quantity + 1 <= stock) {
      setQuantity((prev) => prev + 1)

      const product = {
        id: id,
        quantity: 1
      }

      dispatch(addProduct(product))
    }
  }

  return (
    <div className='border border-slate-200 rounded-sm w-64 h-96'>
      <Link href={`/products/${category}/${id}`}>
        <Image
          src={image}
          alt={`${name} image`}
          width='288'
          height='288'
          title='Check product details'
          className='cursor-pointer rounded-t-sm hover:opacity-70 transition-all'
        />
      </Link>
      <h2 className='pt-3'>
        <span>{name.toUpperCase()}</span>
        <span className='text-slate-400 italic font-extralight'>
          {' '}
          - Stock: {stock}
        </span>
      </h2>
      <p className='pt-3'>U$S {price}</p>
      <div className='pt-3 w-full flex justify-center gap-3 items-center'>
        {quantity === 0 ? (
          <button
            className={`border border-slate-300 rounded-sm w-28 h-9 ${
              stock === 0 && 'text-slate-300'
            }`}
            onClick={plusQuantity}
            disabled={stock === 0}
          >
            {stock === 0 ? 'Not available' : 'Add to cart'}
          </button>
        ) : (
          <>
            <Button sign='-' updateQuantity={minusQuantity} />
            <span className='text-lg w-8'>{quantity}</span>
            <Button sign='+' updateQuantity={plusQuantity} />
          </>
        )}
      </div>
    </div>
  )
}
