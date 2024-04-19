import { MouseEventHandler } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'

interface ItemInterface {
  mode: string
  text: string
  onClick: MouseEventHandler<HTMLLIElement>
}

export const Item = ({ mode, text, onClick }: ItemInterface) => {
  const { profilePageState } = useAppSelector((state) => state.mode)

  return (
    <li
      className={`px-8 py-3 w-max transition-all hover:bg-slate-300 cursor-pointer border content-center ${
        profilePageState === mode && 'bg-slate-200'
      }`}
      onClick={onClick}
    >
      {text}
    </li>
  )
}
