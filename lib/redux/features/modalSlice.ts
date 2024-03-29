import { createSlice } from '@reduxjs/toolkit'

interface ModalInterface {
  isOn: boolean
}

const initialState: ModalInterface = {
  isOn: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOn = true
    },
    closeModal: (state) => {
      state.isOn = false
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
