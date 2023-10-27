import { configureStore } from "@reduxjs/toolkit"
import productReducer from '../redux/productSlice'
import cartReducer from '../redux/cartWithOutApiSlice'
import ordersReducer from '../redux/orderListSlice'
import userInfoReducer from '../redux/userInfoSlice'

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        cart: cartReducer,
        products: productReducer,
        orders: ordersReducer
    }
})