'use client'

import { ProductsContainer } from '../products-container/products-container'
import { ProductsSectionTag } from '@/app/components/products-section-tag/products-section-tag'

export default function Category({ params }: any) {
  const { category } = params
  return (
    <ProductsSectionTag>
      <ProductsContainer params={params} />
    </ProductsSectionTag>
  )
}
