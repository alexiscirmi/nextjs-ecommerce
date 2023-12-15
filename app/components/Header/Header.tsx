import { Urbanist } from 'next/font/google'
import styles from './Header.module.css'

const zen = Urbanist({
  subsets: ['latin'],
  weight: '100'
})

export const Header = () => {

  return (
      <header className={`fixed top-0 flex w-full ${zen.className} ${styles.header}`}>
        <nav className='relative flex justify-center items-center h-full w-full'>
          <div id='navbarBg' className='h-full w-full bg-white blur-sm'/>
          <div id='title' className='absolute flex antialiased'>
            <span className='text-5xl scale-100'>A</span>
            <span className='text-5xl -scale-x-100'>N</span>
            <span className='text-5xl scale-100'>VERSO</span>
          </div>
        </nav>
      </header>
  )
}