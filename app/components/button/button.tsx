interface ButtonInterface {
  type: 'button' | 'submit'
  text: string | React.ReactNode
  className: string
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
}

export const Button = ({
  type,
  text,
  className,
  handleClick,
  disabled
}: ButtonInterface) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center border border-slate-300 rounded-md hover:bg-gray-200 font-light transition-all ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
