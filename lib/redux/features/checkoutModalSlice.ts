import { createSlice } from '@reduxjs/toolkit'
import { type ModalInterface } from '@/types'

const initialState: ModalInterface = {
  isOn: false
}

export const checkoutModalSlice = createSlice({
  name: 'checkoutModal',
  initialState,
  reducers: {
    openCheckoutModal: (state) => {
      state.isOn = true
    },
    closeCheckoutModal: (state) => {
      state.isOn = false
    }
  }
})

export const { openCheckoutModal, closeCheckoutModal } =
  checkoutModalSlice.actions

export default checkoutModalSlice.reducer
