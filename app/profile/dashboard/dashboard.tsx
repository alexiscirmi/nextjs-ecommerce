import { ProfileSelector } from './profile-selector/profile-selector'
import { ProfileDetail } from './profile-detail/profile-detail'

export const Dashboard = () => {
  return (
    <div className='flex flex-col mt-8 px-1'>
      <ProfileSelector />
      <ProfileDetail />
    </div>
  )
}
