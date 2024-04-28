import { Fragment } from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'
import { openSignInModal } from '@/lib/redux/features/signInModalSlice'
import { auth } from '@/lib/firebase/firebase'
import { signOut } from 'firebase/auth'
import { Menu, Transition } from '@headlessui/react'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { MenuItem } from './menu-item/menu-item'

interface ItemInt {
  text: string
  url: string
}

export const Item: React.FC<ItemInt> = ({ text, url }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleSidebar())
  }
  const handleModal = () => {
    dispatch(openSignInModal())
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
  }

  switch (text) {
    case 'Home':
      return (
        <Link
          href={url}
          className='px-8 py-3 mb-4 transition-all hover:bg-slate-100'
          onClick={handleClick}
        >
          {text}
        </Link>
      )
    case 'Sign in':
      return (
        <li
          className='px-8 py-3 mb-4 transition-all hover:bg-slate-100 cursor-pointer'
          onClick={handleModal}
        >
          {text}
        </li>
      )
    case 'Profile':
      return (
        <Link
          href={url}
          className='px-8 py-3 mb-4 transition-all hover:bg-slate-100'
          onClick={handleClick}
        >
          {text}
        </Link>
      )
    case 'Sign out':
      return (
        <li className='flex items-end h-full'>
          <span
            className='w-full text-center px-8 py-3 mb-4 hover:bg-slate-100 transition-all cursor-pointer'
            onClick={handleSignOut}
          >
            Sign out
          </span>
        </li>
      )
    default:
      return (
        <Menu as='div' className='relative mb-4 hover:bg-slate-100'>
          <Menu.Button className='flex justify-between px-8 py-3 items-center w-full'>
            {text}
            <ChevronLeftIcon
              className='-mr-1 h-5 w-5 text-slate-400'
              aria-hidden='true'
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-150'
            enterFrom='transform translate-x-24 opacity-0'
            enterTo='transform translate-x-0 opacity-100'
            leave='transition ease-out duration-150'
            leaveFrom='transform translate-x-0  opacity-100'
            leaveTo='transform translate-x-24 opacity-0'
          >
            <Menu.Items className='absolute right-48 top-0 w-40 origin-right bg-slate-50 focus:outline-none border-t border-b border-l border-slate-100'>
              <MenuItem text='All products' url='/products' />
              <MenuItem text='Bags' url='/products/bags' />
              <MenuItem text='Jackets' url='/products/jackets' />
              <MenuItem text='Pants' url='/products/pants' />
            </Menu.Items>
          </Transition>
        </Menu>
      )
  }
}
