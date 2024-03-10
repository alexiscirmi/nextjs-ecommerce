'use client'

import { useParams } from 'next/navigation'
import { ProductsContainer } from '../products-container/products-container'
import { ProductsSectionTag } from '@/app/components/products-section-tag/products-section-tag'

export default function Category() {
  const params = useParams<{ category: string }>()
  return (
    <ProductsSectionTag>
      <ProductsContainer params={params} />
    </ProductsSectionTag>
  )
}
