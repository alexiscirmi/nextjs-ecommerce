interface ButtonInterface {
  updateQuantity: React.MouseEventHandler<HTMLButtonElement>
  sign: string
}

export const Button = ({ updateQuantity, sign }: ButtonInterface) => {
  return (
    <button
      className='border border-slate-300 rounded-sm w-9 h-9'
      onClick={updateQuantity}
    >
      {sign}
    </button>
  )
}
