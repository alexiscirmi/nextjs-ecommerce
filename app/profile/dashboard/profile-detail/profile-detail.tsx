import { useAppSelector } from '@/lib/redux/hooks'

export const ProfileDetail = () => {
  const { profilePageState } = useAppSelector((state) => state.mode)

  if (profilePageState === 'info') {
    return <div className='col-span-3'>info</div>
  } else if (profilePageState === 'orders') {
    return <div className='col-span-3'>orders</div>
  }
}
