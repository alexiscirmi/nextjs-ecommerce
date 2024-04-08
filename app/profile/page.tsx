'use client'

import { useRouter } from 'next/navigation'
import { SectionContainer } from '../components/section-container/section-container'
import { Spinner } from '../components/spinner/spinner'
import { useAppSelector } from '@/lib/redux/hooks'

export default function Profile() {
  const { userState } = useAppSelector((state) => state.user)
  const router = useRouter()

  if (userState !== null) {
    if (userState) {
      const displayName = userState.displayName
      const email = userState.email
      const photoURL = userState.photoURL
      const emailVerified = userState.emailVerified
      const uid = userState.uid
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
  } else {
    return (
      <SectionContainer className=''>
        <Spinner loadingScreen={true} />
      </SectionContainer>
    )
  }
}
