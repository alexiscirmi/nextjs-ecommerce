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
          <h1 className='text-5xl'>A</h1>
          <h1 className='text-5xl -scale-x-100'>N</h1>
          <h1 className='text-5xl'>V</h1>
          <h1 className='text-5xl'>E</h1>
          <h1 className='text-5xl'>R</h1>
          <h1 className='text-5xl'>S</h1>
          <h1 className='text-5xl'>O</h1>
        </div>
      </nav>
    </header>
  )
}