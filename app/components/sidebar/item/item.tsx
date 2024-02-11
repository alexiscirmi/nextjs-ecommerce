import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'

interface ItemInt {
  text: string
}

export const Item: React.FC<ItemInt> = ({ text }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <li
      className='ps-3 py-3 mb-4 hover:bg-slate-200 transition-all'
      onClick={handleClick}
    >
      {text}
    </li>
  )
}
