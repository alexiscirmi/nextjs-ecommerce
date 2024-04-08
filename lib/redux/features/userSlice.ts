import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface SignedInInterface {
  signedIn: boolean
  userState: null | false | User
}

const initialState: SignedInInterface = {
  signedIn: false,
  userState: null
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
    },
    userOk: (state, action: PayloadAction<User>) => {
      const User = action.payload
      state.userState = User
    },
    userFalse: (state) => {
      state.userState = false
    }
  }
})

export const { signIn, signOut, userOk, userFalse } = userSlice.actions

export default userSlice.reducer
