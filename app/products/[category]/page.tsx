'use client'

import { useParams } from 'next/navigation'
import { ProductsContainer } from '../products-container/products-container'

export default function Category() {
  const params = useParams<{ category: string }>()
  return (
    <section
      className='flex justify-evenly items-center h-full'
      style={{ minHeight: '88vh' }}
    >
      <ProductsContainer params={params} />
    </section>
  )
}
