import { createSlice } from '@reduxjs/toolkit'
import { type ModalInterface } from '@/types'

const initialState: ModalInterface = {
  isOn: false
}

export const signInModalSlice = createSlice({
  name: 'signInModal',
  initialState,
  reducers: {
    openSignInModal: (state) => {
      state.isOn = true
    },
    closeSignInModal: (state) => {
      state.isOn = false
    }
  }
})

export const { openSignInModal, closeSignInModal } = signInModalSlice.actions

export default signInModalSlice.reducer
