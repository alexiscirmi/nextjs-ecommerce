'use client'

import Image from 'next/image'
import SquareLogo from '@/public/square-logo.png'
import { SquareForm } from './square-form/square-form'

export default function Checkout() {
  return (
    <>
      <div className='mb-2 flex justify-center'>
        <Image
          src={SquareLogo}
          alt='Square Payments logo'
          height='50'
          priority
        />
      </div>
      <div className='min-h-48 flex justify-center'>
        <SquareForm />
      </div>
      <a
        href='https://developer.squareup.com/docs/devtools/sandbox/payments#web-and-mobile-client-testing'
        target='_blank'
        className='mt-4 text-center text-slate-600'
      >
        (Click here for test credit card numbers)
      </a>
    </>
  )
}
