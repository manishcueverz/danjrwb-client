/* eslint-disable no-unused-vars */
import React from 'react'
import Badge from '@material-ui/core/Badge';
import { useNavigate } from 'react-router-dom'
import { ImLocation } from "react-icons/im"
import { useDispatch, useSelector } from 'react-redux'
import { getUserDeliveryAddress, getUserMobile, getUserName } from "../redux/userInfoSlice";
import { clearCart, getCartItems, getCartTotal } from '../redux/cartWithOutApiSlice';
import axios from 'axios';

const CartBottomBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userName = useSelector(getUserName)
    const userMobile = useSelector(getUserMobile)
    const userDeliveryAddress = useSelector(getUserDeliveryAddress)

    const cartProductRV = useSelector(getCartItems)
    const cartTotalRV = useSelector(getCartTotal)

    const placeOrder = async () => {
        if (userDeliveryAddress !== '') {
            const cartData = [];
            Object.entries(cartProductRV).forEach(([key, value]) => {
                const data = {
                    "_id": value.id,
                    "name": value.name,
                    "quantity": value.quantity,
                    "price": value.price,
                    "images": value.image
                }
                cartData.push(data)
            })
            const orderData = {
                cart: cartData,
                totalPrice: cartTotalRV,
                address: userDeliveryAddress,
                paymentId: '1234567'
            }
            const PLACE_ORDER_URL = 'https://dan-jr-wb-server.onrender.com/api/order';
            const userToken = localStorage.getItem('user_token')
            const options = {
                method: 'POST',
                url: PLACE_ORDER_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': userToken
                },
                data: orderData
            }
            const response = await axios.request(options).then((response) => {
                dispatch(clearCart())
                navigate('/')
            })
                .catch((error) => {
                    if (error.response) {
                        console.error('Server Error:', error.response.status);
                    } else if (error.request) {
                        console.error('Network Error:', error.request);
                    } else {
                        console.error('Error:', error.message);
                    }
                });
        } else {
            console.log('Plz enter deliver address')
        }
    }

    return (
        <div className='h-20 flex justify-between items-center p-3 sticky bottom-0 bg-white '>
            <div className='flex items-center'>
                <ImLocation size={30} color='yellow' />
                <div className=' ml-4'>
                    <p className=' text-sm font-bold'>Deliver Address</p>
                    <p className=' text-xs'>{userDeliveryAddress !== '' ? userDeliveryAddress : "No Address"}</p>
                </div>
            </div>

            <button
                onClick={() => placeOrder()}
                className={` h-10 w-24 ml-7 bg-yellow-200  border rounded-full text-xs font-semibold `}
            >Place Order
            </button>
        </div>
    )
}

export default CartBottomBar