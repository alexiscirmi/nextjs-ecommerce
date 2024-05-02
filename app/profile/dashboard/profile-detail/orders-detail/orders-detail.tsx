import { db } from '@/lib/firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { Spinner } from '@/app/components/spinner/spinner'
import { Order } from './order/order'
import { type OrdersInterface } from '@/types'

export const OrdersDetail = () => {
  const [orders, setOrders] = useState<OrdersInterface[]>([])
  const [loading, setLoading] = useState(true)

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
      <div className='grid py-3 md:pt-10 pb-20 px-1 sm:px-5 lg:px-14 xl:px-24 text-xs sm:text-sm md:text-base'>
        <div className='grid grid-cols-4 items-center font-extralight sm:font-light pb-1'>
          <span>ORDER N°</span>
          <span>PRODUCTS</span>
          <span>DATE</span>
          <span>TOTAL</span>
        </div>
        {orders.map((order) => (
          <Order key={order.id} orderId={order.id} orders={orders} />
        ))}
      </div>
    )
  } else {
    return <p className='py-1'>You haven&apos;t ordered anything.</p>
  }
}
