import { ProductsSectionTag } from '../components/products-section-tag/products-section-tag'
import { ProductsContainer } from './products-container/products-container'

export default function Products() {
  return (
    <ProductsSectionTag>
      <ProductsContainer params={{ category: '' }} />
    </ProductsSectionTag>
  )
}
