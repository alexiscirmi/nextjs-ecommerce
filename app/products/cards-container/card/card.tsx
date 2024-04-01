import Image from 'next/image'
import Link from 'next/link'
import { type ProductInterface } from '@/types'

export const Card = ({
  id,
  category,
  image,
  name,
  price,
  stock
}: ProductInterface) => {
  return (
    <div className='border border-slate-300 rounded-sm w-64 h-96'>
      <Link href={`/products/${category}/${id}`}>
        <Image
          src={image}
          alt={`${name} image`}
          width='288'
          height='288'
          title='Check product details'
          className='cursor-pointer rounded-t-sm hover:opacity-70 transition-all'
        />
      </Link>
      <h2 className='pt-3'>
        <span>{name}</span>
        <span className='text-slate-400 italic font-extralight'>
          {' '}
          - Stock: {stock}
        </span>
      </h2>
      <p className='pt-2 text-lg'>U$S {price}</p>
      <div className='pt-2 w-full flex justify-center'>
        <Link
          href={`/products/${category}/${id}`}
          className={`border border-slate-300 rounded-md w-28 h-9 content-center hover:bg-gray-200 transition-all`}
        >
          See details
        </Link>
      </div>
    </div>
  )
}
