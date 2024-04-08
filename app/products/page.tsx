import { SectionContainer } from '../components/section-container/section-container'
import { CardsContainer } from './cards-container/cards-container'

export default function Products() {
  return (
    <SectionContainer className=''>
      <CardsContainer params={{ category: '' }} />
    </SectionContainer>
  )
}
