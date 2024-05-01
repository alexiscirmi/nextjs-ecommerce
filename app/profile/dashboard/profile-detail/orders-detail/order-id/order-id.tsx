import { Dispatch, SetStateAction } from 'react'

interface OrderNumberInterface {
  orderId: string
  setCurrentOrder: Dispatch<SetStateAction<string | undefined>>
}

export const OrderId = ({ orderId, setCurrentOrder }: OrderNumberInterface) => {
  const handleClick = () => {
    setCurrentOrder(orderId)
  }

  return (
    <div
      className='hover:bg-slate-100 py-2 cursor-pointer text-wrap overflow-x-scroll'
      onClick={handleClick}
    >
      <p>{orderId.slice(0, 11)}...</p>
    </div>
  )
}
