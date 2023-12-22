'use client'

import { useSidebarContext } from '@/app/context/context'
import { Burger } from '../burger/burger'

export const Sidebar = () => {
  const { sidebar } = useSidebarContext()

  if (sidebar) {
    return (
      <div className='flex flex-col absolute top-0 h-full w-40 z-20 bg-slate-200'>
        <Burger className='mx-auto my-5' />
        <ul>
          <li>Hola</li>
          <li>cómo</li>
          <li>estás</li>
        </ul>
      </div>
    )
  }
}
