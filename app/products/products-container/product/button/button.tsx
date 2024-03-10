interface ButtonInterface {
  updateQuantity: React.MouseEventHandler<HTMLButtonElement>
  sign: string
}

export const Button = ({ updateQuantity, sign }: ButtonInterface) => {
  return (
    <button className='border w-8 h-8' onClick={updateQuantity}>
      {sign}
    </button>
  )
}
