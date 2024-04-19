import { useAppDispatch } from '@/lib/redux/hooks'
import { Item } from './item/item'
import { mode } from '@/lib/redux/features/profilePageSlice'

export const ProfileSelector = () => {
  const dispatch = useAppDispatch()

  const handleInfoClick = () => {
    dispatch(mode('info'))
  }

  const handleOrdersClick = () => {
    dispatch(mode('orders'))
  }

  return (
    <ul className='flex self-center w-min bg-slate-50 text-gray-700 transition-all select-none font-extralight border rounded-md border-slate-200'>
      <Item mode='info' text='Your information' onClick={handleInfoClick} />
      <Item mode='orders' text='Orders' onClick={handleOrdersClick} />
    </ul>
  )
}
