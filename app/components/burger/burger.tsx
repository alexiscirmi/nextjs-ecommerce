'use client'

import { useSidebarContext } from '@/app/context/context'

export const Burger = ({ className }: { className: string }) => {
  const { toggleSidebar } = useSidebarContext()

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      fill='currentColor'
      className={`bi bi-list hover:scale-110 hover:transition-all ${className}`}
      viewBox='0 0 16 16'
      onClick={toggleSidebar}
    >
      <path
        fillRule='evenodd'
        d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
      />
    </svg>
  )
}
