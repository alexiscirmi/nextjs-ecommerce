import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Product {
  id: string
  quantity: number
}

interface CartState {
  products: Product[]
}

const initialState: CartState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { id, quantity } = action.payload
      // Check if the product is already in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      )
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        state.products[existingProductIndex].quantity += quantity
      } else {
        // If the product is not in the cart, add it
        state.products.push({ id, quantity })
      }
    },
    removeProduct: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload
      // Check if the product is already in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      )
      // If the product is already in the cart, update its quantity
      state.products[existingProductIndex].quantity -= quantity
    },
    clearCart: (state) => {
      state.products = []
    }
  }
})

export const { addProduct, removeProduct, clearCart } = cartSlice.actions

export default cartSlice.reducer
