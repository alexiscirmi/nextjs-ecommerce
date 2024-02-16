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
    <Link
      href={url}
      className='flex justify-between items-center px-3 py-3 mb-4 hover:bg-slate-200 transition-all'
      onClick={handleClick}
    >
      {text}
      {text !== 'Home' && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1.5em'
          height='1.5em'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z'
          />
        </svg>
      )}
    </Link>
  )
}
