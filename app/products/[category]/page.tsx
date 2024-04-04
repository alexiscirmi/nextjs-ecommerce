'use client'

import { SectionContainer } from '@/app/products/section-container/section-container'
import { CardsContainer } from '../cards-container/cards-container'

interface ParamsInterface {
  params: {
    category: string
  }
}

export default function Category({ params }: ParamsInterface) {
  return (
    <SectionContainer>
      <CardsContainer params={params} />
    </SectionContainer>
  )
}
