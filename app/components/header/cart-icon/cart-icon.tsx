'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { closeSidebar } from '@/lib/redux/features/sidebarSlice'
import { localStorageCart } from '@/lib/redux/features/cartSlice'

export const CartIcon = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(closeSidebar())
    router.push('/cart')
  }

  useEffect(() => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      dispatch(localStorageCart(JSON.parse(cartData)))
    }
  }, [dispatch])

  const { cartProducts } = useAppSelector((state) => state.cart)
  const amount = cartProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  )

  if (amount > 0) {
    return (
      <div
        className='fixed z-20 left-5 sm:left-16 bg-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer lg:hover:scale-110 transition-all'
        onClick={handleClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='28'
          height='28'
          fill='currentColor'
          className='bi bi-cart'
          viewBox='0 0 16 16'
        >
          <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
        </svg>
        <span className='absolute left-6 bottom-6 text-xs flex justify-center items-center rounded-full w-5 h-5 bg-black text-white'>
          {amount}
        </span>
      </div>
    )
  }
}
