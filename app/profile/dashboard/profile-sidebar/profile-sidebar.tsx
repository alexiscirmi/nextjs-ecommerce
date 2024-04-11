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
    <aside className='grid col-span-2 mx-auto w-fit'>
      <ul className='flex flex-col h-full w-fit gap-1'>
        <Item text='Your information' onClick={handleInfoClick} />
        <Item text='Orders' onClick={handleOrdersClick} />
      </ul>
    </aside>
  )
}
