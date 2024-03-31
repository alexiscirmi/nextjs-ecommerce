import { createSlice } from '@reduxjs/toolkit'

interface SignedInInterface {
  signedIn: boolean
}

const initialState: SignedInInterface = {
  signedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state) => {
      state.signedIn = true
    },
    signOut: (state) => {
      state.signedIn = false
    }
  }
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer
