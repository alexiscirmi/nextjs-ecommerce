import { Urbanist } from 'next/font/google'
import styles from './Header.module.css'

const zen = Urbanist({
  subsets: ['latin'],
  weight: '100'
})

export const Header = () => {

  return (
    <header className={`bg-transparent flex justify-center items-center ${zen.className} ${styles.header}`}>
      <nav>
        <div id='title' className='flex antialiased'>
          <span className='text-5xl'>A</span>
          <span className='text-5xl -scale-x-100'>N</span>
          <span className='text-5xl'>VERSO</span>
        </div>
      </nav>
    </header>
  )
}