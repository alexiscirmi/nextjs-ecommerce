import { db } from '@/lib/firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { Spinner } from '@/app/components/spinner/spinner'
import { OrderId } from './order-id/order-id'
import { OrderDetail } from './order-detail/order-detail'
import { type OrdersInterface } from '@/types'

export const OrdersDetail = () => {
  const [orders, setOrders] = useState<OrdersInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [currentOrder, setCurrentOrder] = useState<undefined | string>(
    undefined
  )

  const { userState } = useAppSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      if (userState && userState.uid) {
        try {
          const ordersCollection = await getDocs(
            query(collection(db, 'orders'), where('uid', '==', userState.uid))
          )
          const ordersData = ordersCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          })) as OrdersInterface[]
          setLoading(false)
          setOrders(ordersData)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()
  }, [userState])

  if (loading) {
    return (
      <div className='flex justify-center'>
        <Spinner loadingScreen={false} />
      </div>
    )
  } else if (orders.length > 0) {
    return (
      <div className='flex min-h-80 w-full justify-center p-1 contain-strict text-sm sm:text-base'>
        <div className='flex flex-col pe-2 w-2/6'>
          <p className='text-base sm:text-lg font-light pb-2'>Order IDs</p>
          {orders.map((order) => (
            <OrderId
              key={order.id}
              orderId={order.id}
              setCurrentOrder={setCurrentOrder}
            />
          ))}
        </div>
        <div className='text-left ps-2 border-l border-slate-100 w-4/6 overflow-x-scroll'>
          <p className='text-base sm:text-lg font-light pb-2'>Order detail</p>
          <OrderDetail orders={orders} currentOrder={currentOrder} />
        </div>
      </div>
    )
  } else {
    return <p className='py-1'>You haven&apos;t ordered anything.</p>
  }
}
