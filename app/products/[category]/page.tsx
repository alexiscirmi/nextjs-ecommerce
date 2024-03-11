'use client'

import { ProductsSectionTag } from '@/app/components/products-section-tag/products-section-tag'
import { ProductsContainer } from '../products-container/products-container'

interface ParamsInterface {
  params: {
    category: string
  }
}

export default function Category({ params }: ParamsInterface) {
  return (
    <ProductsSectionTag>
      <ProductsContainer params={params} />
    </ProductsSectionTag>
  )
}
