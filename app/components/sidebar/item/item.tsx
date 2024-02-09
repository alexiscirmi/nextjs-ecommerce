interface ItemInt {
  text: string
}

export const Item: React.FC<ItemInt> = ({ text }) => {
  return (
    <li className='ps-3 py-3 mb-4 hover:bg-slate-200 transition-all'>{text}</li>
  )
}
