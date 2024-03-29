import { createSlice } from '@reduxjs/toolkit'

interface SignedInInterface {
  loggedIn: boolean
}

const initialState: SignedInInterface = {
  loggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true
    },
    logOut: (state) => {
      state.loggedIn = false
    }
  }
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer
