import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'
import Link from 'next/link'

interface ItemInt {
  text: string
  url: string
}

export const Item: React.FC<ItemInt> = ({ text, url }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <li
      className='ps-3 py-3 mb-4 hover:bg-slate-200 transition-all'
      onClick={handleClick}
    >
      <Link href={url}>{text}</Link>
    </li>
  )
}
