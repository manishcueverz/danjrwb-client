
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UPDATE_DELIVERY_ADDRESS_URL = 'https://dan-jr-wb-server.onrender.com/api/save-user-address';

export const updateDeluiveryAddress = createAsyncThunk('update/deliveryAddress', async (newDeliverAddress) => {
    const userToken = localStorage.getItem('user_token')
    const options = {
        method: 'POST',
        url: UPDATE_DELIVERY_ADDRESS_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userToken
        },
        data: {
            address: newDeliverAddress,
        }
    }
    const response = await axios.request(options)
    return response.data
})

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        user_name: '',
        mobile_number: '',
        delivery_address: '',
    },
    reducers: {
        fetchUserData(state, action) {
            state.user_name = action.payload.name
            state.mobile_number = action.payload.number
            state.delivery_address = action.payload.address
        },
    },
    extraReducers(builder) {
        builder
            .addCase(updateDeluiveryAddress.pending, (state, action) => {
            })
            .addCase(updateDeluiveryAddress.fulfilled, (state, action) => {
                state.delivery_address = action.payload.address
            })
            .addCase(updateDeluiveryAddress.rejected, (state, action) => {
            })
    }

})

export const { fetchUserData } = userInfoSlice.actions;

export const getUserName = (state) => state.userInfo.user_name;
export const getUserMobile = (state) => state.userInfo.mobile_number;
export const getUserDeliveryAddress = (state) => state.userInfo.delivery_address;

export default userInfoSlice.reducer