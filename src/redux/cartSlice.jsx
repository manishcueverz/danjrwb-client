
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const ADD_TO_CART_URL = 'https://dan-jr-wb-server.onrender.com/api/add-to-cart';
const REMOVE_TO_CART_URL = 'https://dan-jr-wb-server.onrender.com/api/remove-from-cart/:?id';

export const addToCart = createAsyncThunk('cart/addToCart', async (productId) => {
    const userToken = localStorage.getItem('user_token')
    const options = {
        method: 'POST',
        url: ADD_TO_CART_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
        },
        data: {
            "id": productId
        }
    }
    const response = await axios.request(options)
    return response.data
})

export const removeToCart = createAsyncThunk('cart/removeToCart', async (productId) => {
    const userToken = localStorage.getItem('user_token')
    const options = {
        method: 'DELETE',
        url: REMOVE_TO_CART_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
        },
        data: {},
        params: {
            id: productId
        }
    }
    const response = await axios.request(options)
    return response.data
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        status: 'idle',
        items: [],
        count: 0,
        total: 0,
        error: null
    },
    reducers: {
        fetchCart(state, action) {
            state.items = action.payload
            state.status = 'succeeded'
            state.count = state.items.length
            if (state.items.length === 0) {
                state.total = 0
            }
            state.error = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addToCart.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.cart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(removeToCart.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(removeToCart.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(removeToCart.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { fetchCart } = cartSlice.actions;

export const getCartItems = (state) => state.cart.items;
export const getCartCout = (state) => state.cart.count;
export const getCartTotal = (state) => state.cart.total;
export const getCartStatus = (state) => state.cart.status;
export const getCartError = (state) => state.cart.error;

export default cartSlice.reducer