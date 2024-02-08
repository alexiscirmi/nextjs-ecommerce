'use client'

import { useSidebarContext } from '@/app/context/context'

export const Sidebar = () => {
  const { sidebar } = useSidebarContext()

  return (
    <aside
      className={`fixed z-10 top-0 h-screen w-48 bg-white transition-all select-none ${
        sidebar ? 'translate-x-0' : '-translate-x-48'
      }`}
    >
      <div style={{ height: '11vh' }} />
      <ul className='mt-5'>
        <li className='ps-3 py-3 my-1 hover:bg-slate-200 transition-all'>
          Hola
        </li>
        <li className='ps-3 py-3 my-1 hover:bg-slate-200 transition-all'>
          cómo
        </li>
        <li className='ps-3 py-3 my-1 hover:bg-slate-200 transition-all'>
          estás
        </li>
      </ul>
    </aside>
  )
}
