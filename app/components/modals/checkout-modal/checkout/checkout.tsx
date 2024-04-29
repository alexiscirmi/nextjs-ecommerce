'use client'

import Image from 'next/image'
import SquareLogo from '@/public/square-logo.png'
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'
import { useAppSelector } from '@/lib/redux/hooks'
import { submitPayment } from '@/app/actions/actions'

export default function Checkout() {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts)
  const appId = process.env.NEXT_PUBLIC_SQUARE_APP_ID || ''
  const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || ''

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
        <PaymentForm
          applicationId={appId}
          locationId={locationId}
          cardTokenizeResponseReceived={async (token: any) => {
            const result = await submitPayment(token.token, cartProducts)
            console.log(result)
          }}
        >
          <CreditCard />
        </PaymentForm>
      </div>
      <a
        href='https://developer.squareup.com/docs/devtools/sandbox/payments#web-and-mobile-client-testing'
        target='_blank'
        className='mt-4 text-center text-slate-600'
      >
        (Click here for testing credit card numbers)
      </a>
    </>
  )
}
