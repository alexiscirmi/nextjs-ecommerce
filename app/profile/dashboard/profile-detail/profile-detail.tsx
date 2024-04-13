import { useAppSelector } from '@/lib/redux/hooks'

export const ProfileDetail = () => {
  const { profilePageState } = useAppSelector((state) => state.mode)

  switch (profilePageState) {
    case 'info':
      return (
        <div className='col-span-3 border-l h-full border-slate-200'>info</div>
      )
    case 'orders':
      return (
        <div className='col-span-3 border-l h-full border-slate-200'>
          orders
        </div>
      )
    default:
      break
  }
}
