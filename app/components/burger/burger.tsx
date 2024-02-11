'use client'

import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'

interface BurgerInterface {
  className: string
}

export const Burger: React.FC<BurgerInterface> = ({ className }) => {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className={className} onClick={handleClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        fill='currentColor'
        className='bi bi-list cursor-pointer lg:hover:scale-110 transition-all'
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
