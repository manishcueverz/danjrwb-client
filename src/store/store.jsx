import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productReducer from '../redux/productSlice'
import cartReducer from '../redux/cartWithOutApiSlice'
import ordersReducer from '../redux/orderListSlice'
import userInfoReducer from '../redux/userInfoSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    cart: cartReducer,
    products: productReducer,
    orders: ordersReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)