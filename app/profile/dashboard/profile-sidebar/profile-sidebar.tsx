import { useAppDispatch } from '@/lib/redux/hooks'
import { Item } from './item/item'
import { mode } from '@/lib/redux/features/profilePageSlice'

export const ProfileSidebar = () => {
  const dispatch = useAppDispatch()

  const handleInfoClick = () => {
    dispatch(mode('info'))
  }

  const handleOrdersClick = () => {
    dispatch(mode('orders'))
  }

  return (
    <aside className='grid col-span-2 bg-slate-50 text-gray-700 transition-all select-none font-extralight border-r border-slate-100'>
      <ul className='mt-3 flex flex-col h-full'>
        <Item text='Your information' onClick={handleInfoClick} />
        <Item text='Orders' onClick={handleOrdersClick} />
      </ul>
    </aside>
  )
}
