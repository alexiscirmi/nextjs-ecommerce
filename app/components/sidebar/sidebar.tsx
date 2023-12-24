'use client'

import { useSidebarContext } from '@/app/context/context'
import { Burger } from '../burger/burger'

export const Sidebar = () => {
  const { sidebar } = useSidebarContext()

  return (
    <div
      className={`flex flex-col fixed top-0 h-screen w-48 z-20 bg-slate-200 ${
        sidebar
          ? 'translate-x-0 transition-all'
          : '-translate-x-48 transition-all'
      }`}
    >
      <Burger className='mx-auto my-5' />
      <ul>
        <li>Hola</li>
        <li>cómo</li>
        <li>estás</li>
      </ul>
    </div>
  )
}
