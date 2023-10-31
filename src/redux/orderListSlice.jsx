
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const ORDERS_LIST_URL = 'https://dan-jr-wb-server.onrender.com/api/orders/me';

export const fetchOrdersList = createAsyncThunk('orders/fetchOrdersList', async (id) => {
    const userToken = localStorage.getItem('user_token')
    const options = {
        method: 'GET',
        url: ORDERS_LIST_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
        },
        data: {}
    }
    const response = await axios.request(options)
    return response.data
})

const orderListSlice = createSlice({
    name: 'orders',
    initialState: {
        status: 'idle',
        data: [],
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrdersList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchOrdersList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                const dataToSort = [...state.data];
                const sorted = dataToSort.sort((a, b) => Number(b.orderId) - Number(a.orderId));
                state.data = sorted
            })
            .addCase(fetchOrdersList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getOrders = (state) => state.orders.data;
export const getOrdersStatus = (state) => state.products.status;
export const getOrdersError = (state) => state.products.error;

export default orderListSlice.reducer