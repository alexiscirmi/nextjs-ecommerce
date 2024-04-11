import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './features/sidebarSlice'
import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'
import modalReducer from './features/modalSlice'
import profilePageReducer from './features/profilePageSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      sidebar: sidebarReducer,
      cart: cartReducer,
      user: userReducer,
      modal: modalReducer,
      mode: profilePageReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
