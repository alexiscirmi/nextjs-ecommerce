'use client'

import { useSidebarContext } from '@/app/context/context'
import { Item } from './item/item'

export const Sidebar = () => {
  const { sidebar } = useSidebarContext()

  return (
    <aside
      className={`fixed z-10 top-0 h-screen w-48 bg-white transition-all select-none ${
        sidebar ? 'translate-x-0' : '-translate-x-48'
      }`}
    >
      <div style={{ height: '11vh' }} />
      <ul className='mt-4'>
        <Item text='Hola' />
        <Item text='Hola' />
        <Item text='Hola' />
      </ul>
    </aside>
  )
}
