import { createSlice } from '@reduxjs/toolkit'

interface SidebarState {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSidebar: (state) => {
      state.isOpen = false
    }
  }
})

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
