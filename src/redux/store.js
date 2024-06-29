import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import updateTimeReducer from './updateTimeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    updateTime : updateTimeReducer
  },
})

export default store;
