import { useAppSelector } from '@/lib/redux/hooks'
import { InfoDetail } from './info-detail/info-detail'
import { OrdersDetail } from './orders-detail/orders-detail'

export const ProfileDetail = () => {
  const { profilePageState } = useAppSelector((state) => state.mode)

  return (
    <div className='mt-8'>
      {profilePageState === 'info' && <InfoDetail />}
      {profilePageState === 'orders' && <OrdersDetail />}
    </div>
  )
}
