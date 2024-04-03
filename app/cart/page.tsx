'use client'

import { useAppSelector } from '@/lib/redux/hooks'
import { SectionContainer } from '../components/section-container/section-container'
import { CartProduct } from './cart-product/cart-product'

export default function Cart() {
  const cartProducts = useAppSelector((state) => state.cart.cartProducts)

  return (
    <SectionContainer>
      <div>
        {cartProducts.map((product) => {
          return (
            <CartProduct
              key={product.id}
              id={product.id}
              quantity={product.quantity}
              name={undefined}
              price={undefined}
            />
          )
        })}
      </div>
    </SectionContainer>
  )
}
