'use client'

import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'

export const Burger = () => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div
      className='fixed z-20 right-5 sm:right-16 bg-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer lg:hover:scale-110 transition-all'
      onClick={handleClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        fill='currentColor'
        className='bi bi-list'
        viewBox='0 0 16 16'
      >
        <path
          fillRule='evenodd'
          d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
        />
      </svg>
    </div>
  )
}
