import { ProductsContainer } from './products-container/products-container'

export default function Products() {
  return (
    <section
      className='flex justify-evenly items-center h-full'
      style={{ minHeight: '88vh' }}
    >
      <ProductsContainer params={{ category: '' }} />
    </section>
  )
}
