import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Product {
  id: number
  name: string
  price: number
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
      const { id, name, price, quantity } = action.payload
      // Check if the product is already in the cart
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      )
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        state.products[existingProductIndex].quantity += quantity
      } else {
        // If the product is not in the cart, add it
        state.products.push({ id, name, price, quantity })
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload
      state.products = state.products.filter(
        (product) => product.id !== productIdToRemove
      )
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload
      const productToUpdate = state.products.find(
        (product) => product.id === productId
      )
      if (productToUpdate) {
        productToUpdate.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.products = []
    }
  }
})

export const { addProduct, removeProduct, updateProductQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
