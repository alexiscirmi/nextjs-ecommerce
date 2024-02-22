import { createSlice } from '@reduxjs/toolkit'

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
    addProduct: (state) => {}
  }
})
