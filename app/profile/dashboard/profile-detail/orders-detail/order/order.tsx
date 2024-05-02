import { Product } from './product/product'
import { OrdersInterface } from '@/types'

interface OrderInterface {
  orderId: string
  orders: OrdersInterface[]
}

export const Order = ({ orderId, orders }: OrderInterface) => {
  const order = orders.find((order) => order.id === orderId)

  return (
    <div className='grid grid-cols-4 items-center border-t border-slate-100 py-4 gap-2 break-words'>
      <p>{orderId}</p>
      <ul className='flex flex-col gap-1'>
        {order?.order.map((item) => (
          <Product key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </ul>
      <p>{order?.date.slice(0, 17)}</p>
      <p>$ {order?.total}</p>
    </div>
  )
}
