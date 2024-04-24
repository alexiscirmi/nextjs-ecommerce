'use client'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { signedIn, signedOut } from '@/lib/redux/features/userSlice'
import { auth } from '@/lib/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { Item } from './item/item'
import { useEffect } from 'react'

export const Sidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen)
  const userState = useAppSelector((state) => state.user.userState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user
        dispatch(signedIn({ uid, email, displayName }))
        // ...
      } else {
        // User is signed out
        dispatch(signedOut())
        // ...
      }
    })
  }, [dispatch])

  return (
    <aside
      id='sidebar'
      className={`fixed z-10 top-0 right-0 h-screen w-48 bg-slate-50 text-gray-700 transition-all select-none font-extralight border-l border-slate-100 ${
        isOpen ? 'translate-x-0' : 'translate-x-48'
      }`}
    >
      <div
        className='h-full flex flex-col justify-between'
        style={{ paddingTop: '12vh' }}
      >
        <ul className='mt-3 flex flex-col h-full'>
          <Item text='Home' url='/' />
          <Item text='Products' url='/products' />

          {userState === null ? (
            <li className='px-8 py-3 mb-4 transition-all cursor-pointer animate-pulse'>
              <div className='h-6 bg-gray-200 rounded' />
            </li>
          ) : userState ? (
            <Item text='Profile' url='/profile' />
          ) : (
            <Item text='Sign in' url='' />
          )}

          {userState && <Item text='Sign out' url='' />}
        </ul>

        <div className='flex flex-col text-center opacity-30 gap-1'>
          <p className='text-sm'>Alexis Cirmi</p>
          <a
            href='https://github.com/alexiscirmi/nextjs-ecommerce'
            target='_blank'
            className='self-center pb-4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='currentColor'
              className='bi bi-github'
              viewBox='0 0 16 16'
            >
              <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8' />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
