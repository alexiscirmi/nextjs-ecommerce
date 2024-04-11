import { ProfileSidebar } from './profile-sidebar/profile-sidebar'
import { ProfileDetail } from './profile-detail/profile-detail'

export const Dashboard = () => {
  return (
    <div className='grid grid-cols-5 pt-16 px-5'>
      <ProfileSidebar />
      <ProfileDetail />
    </div>
  )
}
