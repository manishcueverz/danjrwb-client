
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const ORDERS_LIST_URL = 'https://dan-jr-wb-server.onrender.com/admin/get-orders';

export const fetchAllOrdersList = createAsyncThunk('orders/fetchOrdersList', async (id) => {
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

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllOrdersList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllOrdersList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                const dataToSort = [...state.data];
                const sorted = dataToSort.sort((a, b) => Number(b.orderId) - Number(a.orderId));
                state.data = sorted
            })
            .addCase(fetchAllOrdersList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllOrders = (state) => state.admin.data;
export const getAllOrdersStatus = (state) => state.admin.status;
export const getAllOrdersError = (state) => state.admin.error;

export default adminSlice.reducer