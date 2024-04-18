import { ProfileSidebar } from './profile-sidebar/profile-sidebar'
import { ProfileDetail } from './profile-detail/profile-detail'

export const Dashboard = () => {
  return (
    <div className='grid row-span-9 grid-cols-6 mt-8 px-1 border-t border-slate-100'>
      <ProfileSidebar />
      <ProfileDetail />
    </div>
  )
}
