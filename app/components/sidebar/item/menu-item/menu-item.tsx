import React from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/redux/hooks'
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice'

interface ItemInt {
  text: string
  url: string
}

export const MenuItem: React.FC<ItemInt> = ({ text, url }) => {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={url}
          className={classNames(active ? 'bg-gray-100' : '', 'block px-8 py-3')}
          onClick={handleClick}
        >
          {text}
        </Link>
      )}
    </Menu.Item>
  )
}
