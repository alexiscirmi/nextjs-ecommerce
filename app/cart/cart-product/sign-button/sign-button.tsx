import { MouseEventHandler } from 'react'

interface SignButtonInterface {
  sign: string
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const SignButton: React.FC<SignButtonInterface> = ({
  sign,
  handleClick
}) => {
  return (
    <button
      className='font-light text-2xl rounded-sm border h-7 w-7 flex items-center justify-center'
      onClick={handleClick}
    >
      {sign}
    </button>
  )
}
