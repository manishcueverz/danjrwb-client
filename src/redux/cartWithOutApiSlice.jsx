
import { createSlice } from "@reduxjs/toolkit";

const cartWithOutApiSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {},
        count: 0,
        total: 0
    },
    reducers: {
        addProduct(state, action) {
            const { id } = action.payload;
            if (state.items[id]) {
                let totelPrice = 0
                state.items[id].quantity += 1;
                state.items[id].total = state.items[id].quantity * state.items[id].price;
                Object.entries(state.items).forEach(([key, item]) => {
                    totelPrice = Number(totelPrice) + Number(item.total)
                })
                state.total = totelPrice
            } else {
                let totelPrice = 0
                state.items[id] = { ...action.payload, quantity: 1, total: action.payload.price };
                state.count = state.count + 1
                Object.entries(state.items).forEach(([key, item]) => {
                    totelPrice = Number(totelPrice) + Number(item.total)
                })
                state.total = totelPrice
            }
        },
        removeProduct: (state, action) => {
            const { id } = action.payload;
            if (state.items[id]) {
                if (state.items[id].quantity !== 1) {
                    let totelPrice = 0
                    state.items[id].quantity -= 1;
                    state.items[id].total = state.items[id].quantity * state.items[id].price;
                    Object.entries(state.items).forEach(([key, item]) => {
                        totelPrice = Number(totelPrice) + Number(item.total)
                    })
                    state.total = totelPrice
                } else {
                    let totelPrice = 0
                    delete state.items[action.payload.id];
                    state.count = state.count - 1
                    Object.entries(state.items).forEach(([key, item]) => {
                        totelPrice = Number(totelPrice) + Number(item.total)
                    })
                    state.total = totelPrice
                }
            }
        },
        removeFromCart: (state, action) => {
            delete state.items[action.payload.id];
            state.count = state.count - 1
            let totelPrice = 0
            Object.entries(state.items).forEach(([key, item]) => {
                totelPrice = Number(totelPrice) + Number(item.total)
            })
            state.total = totelPrice
        },
        clearCart: (state, action) => {
            state.items = {};
            state.count = 0
            state.total = 0
        },
    },

})

export const { addProduct, removeProduct, removeFromCart, clearCart } = cartWithOutApiSlice.actions;

export const getCartItems = (state) => state.cart.items;
export const getCartCout = (state) => state.cart.count;
export const getCartTotal = (state) => state.cart.total;

export default cartWithOutApiSlice.reducer