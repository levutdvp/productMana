import { configureStore } from '@reduxjs/toolkit'
import UserLoginSlice from './slices/UserLoginSlice'
import  productChosenListSlice  from './slices/cartShopping'
export default configureStore({
  reducer: {
    userLogin: UserLoginSlice,
    productList: productChosenListSlice
  }
})