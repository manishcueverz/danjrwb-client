
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_URL = 'https://dan-jr-wb-server.onrender.com/api/products';

export const fetchProductList = createAsyncThunk('product/fetchProductList', async (id) => {
    const userToken = localStorage.getItem('user_token')
    const options = {
        method: 'GET',
        url: PRODUCT_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
        },
        data: {}
    }
    const response = await axios.request(options)
    return response.data
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        status: 'idle',
        data: null,
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProductList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchProductList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getProduct = (state) => state.products.data;
export const getProductStatus = (state) => state.products.status;
export const getProductError = (state) => state.products.error;

export default productSlice.reducer