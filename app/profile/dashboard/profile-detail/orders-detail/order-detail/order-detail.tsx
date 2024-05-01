import { type OrdersInterface } from '@/types'
import { Item } from './item/item'

interface OrderDetailInterface {
  orders: OrdersInterface[]
  currentOrder: string | undefined
}

export const OrderDetail = ({ orders, currentOrder }: OrderDetailInterface) => {
  const order = orders.find((order) => order.id === currentOrder)
  console.log(order?.order)
  if (order) {
    return (
      <ul className='flex flex-col text-left gap-2 text-wrap'>
        <li className='py-1'>Order ID: {order.id}</li>
        <li>Payment ID: {order.paymentId}</li>
        <li>E-mail: {order.email}</li>
        <li>Order date: {order.date.slice(0, 11)}</li>
        <li>Total paid: $ {order.total}</li>
        <ul className='ps-3 list-disc'>
          {order.order.map((item) => (
            <Item key={item.id} id={item.id} quantity={item.quantity} />
          ))}
        </ul>
      </ul>
    )
  }
}
