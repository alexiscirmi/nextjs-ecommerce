import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './features/loadingSlice'
import sidebarReducer from './features/sidebarSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      loading: loadingReducer,
      sidebar: sidebarReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
