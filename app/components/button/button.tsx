interface ButtonInterface {
  type: 'button' | 'submit'
  text: string
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
      className={`border border-slate-300 rounded-md hover:bg-gray-100 font-light transition-all ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
