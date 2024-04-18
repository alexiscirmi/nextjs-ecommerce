'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'
import { Spinner } from '../components/spinner/spinner'
import { Dashboard } from './dashboard/dashboard'
import { SectionContainer } from '@/app/components/section-container/section-container'

export default function Profile() {
  const { userState } = useAppSelector((state) => state.user)
  const router = useRouter()

  if (userState !== null) {
    if (userState) {
      const displayName = userState.displayName
      const email = userState.email
      return (
        <section
          className='grid grid-rows-10 py-3 md:pt-10 pb-10 h-full'
          style={{ height: '88vh' }}
        >
          {displayName ? (
            <h1 className='text-2xl row-span-1'>Hello, {displayName}!</h1>
          ) : (
            <h1 className='text-2xl row-span-1'>
              Hello, {email?.slice(0, email?.indexOf('@'))}!
            </h1>
          )}
          <Dashboard />
        </section>
      )
    } else {
      router.push('/')
    }
  } else {
    return (
      <SectionContainer>
        <Spinner loadingScreen={true} />
      </SectionContainer>
    )
  }
}
