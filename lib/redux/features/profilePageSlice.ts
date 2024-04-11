import { createSlice } from '@reduxjs/toolkit'

interface ProfileInterface {
  profilePageState: string
}

const initialState: ProfileInterface = {
  profilePageState: 'info'
}

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    mode: (state, action) => {
      state.profilePageState = action.payload
    }
  }
})

export const { mode } = profilePageSlice.actions

export default profilePageSlice.reducer
