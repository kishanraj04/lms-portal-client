import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi' // createApi instance
import userReducer from './slice/userSlice.js'
import { courseApi } from './api/courseApi.js'
import { lecturProgressApi } from './api/lectureprogressApi.js'
import { instructorApi } from './api/instructoApi.js'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [lecturProgressApi.reducerPath]:lecturProgressApi.reducer,
    [instructorApi.reducerPath]:instructorApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,courseApi.middleware,lecturProgressApi.middleware,instructorApi.middleware),
})
