import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

interface SignedInInterface {
  userState: null | false | User
}

const initialState: SignedInInterface = {
  userState: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<User>) => {
      const User = action.payload
      state.userState = User
    },
    signedOut: (state) => {
      state.userState = false
    }
  }
})

export const { signedIn, signedOut } = userSlice.actions

export default userSlice.reducer
