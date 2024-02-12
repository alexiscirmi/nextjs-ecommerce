'use client'

import { useAppSelector } from '@/lib/redux/hooks'
import { Item } from './item/item'

export const Sidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen)

  return (
    <aside
      className={`fixed z-10 top-0 h-screen w-48 bg-white transition-all select-none ${
        isOpen ? 'translate-x-0' : '-translate-x-48'
      }`}
    >
      <div style={{ height: '11vh' }} />
      <ul className='mt-3 flex flex-col'>
        <Item text='Home' url='/' />
        <Item text='Products' url='/products' />
      </ul>
    </aside>
  )
}
