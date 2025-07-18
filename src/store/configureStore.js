import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi' // createApi instance
import userReducer from './slice/userSlice.js'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})
