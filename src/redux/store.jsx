import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './counterrSlice'
export default configureStore({
  reducer: dataReducer,
})