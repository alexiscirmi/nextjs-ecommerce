import { createSlice } from '@reduxjs/toolkit'

interface CartState {}

const initialState: CartState = []

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state) => {}
  }
})
