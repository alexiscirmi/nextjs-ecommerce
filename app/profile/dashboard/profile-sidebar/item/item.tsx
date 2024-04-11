import { MouseEventHandler } from 'react'

interface ItemInterface {
  text: string
  onClick: MouseEventHandler<HTMLLIElement>
}

export const Item = ({ text, onClick }: ItemInterface) => {
  return (
    <li
      className='flex justify-center items-center border rounded-md border-slate-300 px-8 h-10 transition-all hover:bg-gray-200 cursor-pointer'
      onClick={onClick}
    >
      {text}
    </li>
  )
}
