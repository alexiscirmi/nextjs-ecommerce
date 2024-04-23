import { Dispatch, SetStateAction } from 'react'

interface CancelButton {
  setEditing: Dispatch<SetStateAction<boolean>>
  setInputValue: Dispatch<SetStateAction<string>>
  resetInputValue: () => void
}

export const CancelButton = ({ setEditing, resetInputValue }: CancelButton) => {
  const handleClick = () => {
    resetInputValue()
    setEditing(false)
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 1024 1024'
      onClick={handleClick}
      className='cursor-pointer'
    >
      <path
        fill='black'
        d='m466.752 512l-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z'
      ></path>
      <path
        fill='black'
        d='M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896'
      ></path>
    </svg>
  )
}
