import { ProductsContainer } from './products-container/products-container'

export default function Products() {
  return (
    <main className='text-center h-full'>
      <h1>Products</h1>
      <section className='flex justify-evenly items-center pt-10'>
        <ProductsContainer />
      </section>
    </main>
  )
}
