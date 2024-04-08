'use client'

import { auth } from '@/lib/firebase/firebase'
import { useRouter } from 'next/navigation'
import { SectionContainer } from '../components/section-container/section-container'

export default function Profile() {
  const user = auth.currentUser
  const router = useRouter()

  if (user !== null) {
    const displayName = user.displayName
    const email = user.email
    const photoURL = user.photoURL
    const emailVerified = user.emailVerified
    const uid = user.uid
    return (
      <SectionContainer className=''>
        {displayName ? (
          <h1 className='text-2xl'>Hello, {displayName}!</h1>
        ) : (
          <h1 className='text-2xl'>
            Hello, {email?.slice(0, email?.indexOf('@'))}!
          </h1>
        )}
        {/* <div className='grid grid-cols-5'>
          <aside className='col-span-1'></aside>
          <div className='col-span-4'></div>
        </div> */}
      </SectionContainer>
    )
  } else {
    router.push('/')
  }
}
