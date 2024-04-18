import { MouseEventHandler } from 'react'

interface ItemInterface {
  text: string
  onClick: MouseEventHandler<HTMLLIElement>
}

export const Item = ({ text, onClick }: ItemInterface) => {
  return (
    <li
      className='px-8 py-3 mb-4 transition-all hover:bg-gray-100 cursor-pointer'
      onClick={onClick}
    >
      {text}
    </li>
  )
}
