import { Urbanist } from 'next/font/google'
import styles from './header.module.css'
import { Burger } from '../burger/burger'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '100',
})

export const Header = () => {
  return (
    <header
      className={`fixed top-0 flex w-full ${urbanist.className} ${styles.header}`}
    >
      <div id='navbarBg' className='absolute h-full w-full bg-white blur-lg' />
      <nav className='flex justify-center z-10 items-center h-full w-full'>
        <Burger className='absolute left-5 ' />
        <div id='title' className='flex justify-self-center antialiased'>
          <span className='text-4xl sm:text-5xl scale-100'>A</span>
          <span className='text-4xl sm:text-5xl -scale-x-100'>N</span>
          <span className='text-4xl sm:text-5xl scale-100'>VERSO</span>
        </div>
      </nav>
    </header>
  )
}
