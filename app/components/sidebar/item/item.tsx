import { Fragment } from 'react'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'
import { Menu, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
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

  if (text === 'Home') {
    return (
      <Link
        href={url}
        className='flex justify-between items-center px-3 py-3 mb-4 transition-all hover:bg-gray-100 '
        onClick={handleClick}
      >
        {text}
      </Link>
    )
  } else {
    return (
      <Menu as='div' className='relative mb-4 hover:bg-gray-100'>
        <Menu.Button className='px-3 py-3 flex justify-between items-center w-full'>
          {text}
          <ChevronRightIcon
            className='-mr-1 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-150'
          enterFrom='transform -translate-x-24 opacity-0'
          enterTo='transform translate-x-0 opacity-100'
          leave='transition ease-out duration-150'
          leaveFrom='transform translate-x-0 opacity-100'
          leaveTo='transform -translate-x-24 opacity-0'
        >
          <Menu.Items className='absolute left-48 top-0 w-56 origin-left bg-white focus:outline-none'>
            <MenuItem text='All products' url='/products' />
            <MenuItem text='Bags' url='' />
            <MenuItem text='Jackets' url='' />
            <MenuItem text='Pants' url='' />
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }
}
