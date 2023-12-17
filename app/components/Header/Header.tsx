import { Urbanist } from "next/font/google"
import styles from "./Header.module.css"
import { Burger } from "./Burger/Burger"

const zen = Urbanist({
  subsets: ["latin"],
  weight: "100",
})

export const Header = () => {
  return (
    <header
      className={`fixed top-0 flex w-full ${zen.className} ${styles.header}`}
    >
      <div id='navbarBg' className='absolute h-full w-full bg-white blur-lg' />
      <nav className='flex justify-center z-10 items-center h-full w-full'>
        <Burger />
        <div id='title' className='flex justify-self-center antialiased'>
          <span className='text-5xl scale-100'>A</span>
          <span className='text-5xl -scale-x-100'>N</span>
          <span className='text-5xl scale-100'>VERSO</span>
        </div>
      </nav>
    </header>
  )
}
