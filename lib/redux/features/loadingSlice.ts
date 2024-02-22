import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: true
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingOn: (state) => {
      state.isLoading = true
    },
    loadingOff: (state) => {
      state.isLoading = false
    }
  }
})

export const { loadingOn, loadingOff } = loadingSlice.actions

export default loadingSlice.reducer
