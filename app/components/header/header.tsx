import { Urbanist } from 'next/font/google'
import { Burger } from '@/app/components/burger/burger'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '100'
})

export const Header = () => {
  return (
    <header
      className={`fixed top-0 flex w-full z-20 select-none ${urbanist.className}`}
      style={{ height: '11vh' }}
    >
      <nav className='flex bg-white justify-center items-center h-full w-full'>
        <Burger className='absolute left-5 sm:left-16' />

        <div className='flex'>
          <h1 id='title' className='flex justify-self-center antialiased'>
            <span className='text-3xl sm:text-5xl scale-100'>A</span>
            <span className='text-3xl sm:text-5xl -scale-x-100'>N</span>
            <span className='text-3xl sm:text-5xl scale-100'>VERSO</span>
          </h1>

          <h2 className='hidden sm:flex flex-col text-xs'>
            <span className='mt-1'>STYLING</span>
            <span className='-my-1'>YOUR</span>
            <span className='mb-1'>DESIRES</span>
          </h2>
        </div>
      </nav>
    </header>
  )
}
