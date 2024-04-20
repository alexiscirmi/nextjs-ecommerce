import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SerializableUser {
  uid: null | string
  email: null | string
  displayName: null | string
  [key: string]: null | string
}

interface SignedInInterface {
  userState: null | false | SerializableUser
}

const initialState: SignedInInterface = {
  userState: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<SerializableUser>) => {
      const { uid, email, displayName } = action.payload
      state.userState = { uid, email, displayName }
    },
    signedOut: (state) => {
      state.userState = false
    }
  }
})

export const { signedIn, signedOut } = userSlice.actions

export default userSlice.reducer
