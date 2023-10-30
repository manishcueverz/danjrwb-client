import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi"
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrders, fetchAllOrdersList, getAllOrdersError, getAllOrdersStatus } from "../redux/adminSlice";
import { format } from 'date-fns'
import axios from 'axios';
import SearchBox from '../components/SearchBox'


const Admin = () => {
    const navigate = useNavigate();
    const ordersListRV = useSelector(getAllOrders)
    const ordersListStatusRV = useSelector(getAllOrdersStatus);
    const ordersListFetchEoorRV = useSelector(getAllOrdersError);
    const [ordersList, setOrdersList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [refersh, setRefersh] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllOrdersList())
    }, [dispatch, refersh])

    useEffect(() => {
        if ((ordersListStatusRV === 'succeeded' && ordersListFetchEoorRV === null)) {
            setOrdersList(ordersListRV)
        }
    }, [ordersListFetchEoorRV, ordersListRV, ordersListStatusRV])

    const logOut = () => {
        localStorage.clear()
        navigate('/signin')
    }

    const orderStatus = (value) => {
        if (value === 1) {
            return 'Waiting'
        } else if (value === 2) {
            return 'Approved'
        }
        else if (value === 3) {
            return 'Deliverd'
        }
        else if (value === 0) {
            return 'rejected'
        }
        return ''
    }

    const UpdateorderStatus = (value) => {
        if (value === 1) {
            return 'Approved'
        } else if (value === 2) {
            return 'Deliverd'
        }
        return ''
    }

    const axiosSubmit = async (value) => {
        const userToken = localStorage.getItem('user_token')
        const options = {
            method: 'POST',
            url: 'https://dan-jr-wb-server.onrender.com/admin/change-order-status',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': userToken
            },
            data: {
                "id": value._id,
                "status": Number(value.status) + 1
            }
        }
        await axios.request(options)
            .then((response) => {
                setRefersh(!refersh)
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
    }

    const onChange = event => {
        setSearchValue('')
        if (event.target.value === 'All') {
            setOrdersList(ordersListRV)
        } else {
            let filtevalue = 0
            console.log(event.target.value)
            if (event.target.value === 'Waiting') {
                filtevalue = 1
            } else if (event.target.value === 'Approved') {
                filtevalue = 2
            }
            else if (event.target.value === 'Deliverd') {
                filtevalue = 3
            }
            const filterList = ordersListRV.filter(item => item.status === filtevalue)
            setOrdersList(filterList)
        }
    }

    const handleChange = (value) => {
        setSearchValue(value);
        filterData(value);
    };

    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/gi, "");
        if (lowercasedValue === "") setOrdersList(ordersListRV);
        else {
            const filteredData = ordersListRV.filter((item) => item.orderId === Number(lowercasedValue));
            setOrdersList(filteredData);
        }
    };

    return (
        <div className='bg-gray-100  min-h-screen'>
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
                Admin
                <FiLogOut
                    onClick={() => logOut()}
                />
            </div>
            <div className=' flex justify-center items-center'>
                <SearchBox
                    Svalue={searchValue}
                    SonChange={(e) => handleChange(e.target.value)}
                />
                <select
                    onChange={onChange}
                    id="pricingType" name="pricingType"
                    class=" w-28 h-10 border-2  text-black rounded-full px-2 md:px-3 py-0 md:py-1 tracking-wider mt-5 mr-5 text-xs">
                    <option value="All" selected="">All</option>
                    <option value="Deliverd">Deliverd</option>
                    <option value="Approved">Approved</option>
                    <option value="Waiting">Waiting</option>
                </select>
            </div>
            {
                ordersListStatusRV === 'loading' ? <p className=' text-center'>Loading...</p> : <>
                    {
                        ordersListFetchEoorRV !== null ? <p>{ordersListFetchEoorRV}</p> : <>
                            {
                                ordersList.length !== 0 ? <div className=' mt-5'>{
                                    ordersList.map((item => {
                                        return (
                                            <div className='  bg-white rounded-xl ml-4 mr-4 mt-2 p-4'>
                                                <div className=''>
                                                    <div className=' border-b-2 pb-2  flex justify-between mb-2'>
                                                        <div>
                                                            <p className=' text-xs font-semibold'>OrderID:#{item.orderId}</p>
                                                            <p className=' text-xs'>{format(item.orderedAt, 'MMMM do yyyy, h:mm a')}</p>
                                                        </div>
                                                        <p className=' text-sm font-bold'>${item.totalPrice}</p>
                                                    </div>
                                                    <div className=' flex justify-between'>
                                                        <p className=' text-xs font-semibold  bg-yellow-200  pl-2 pr-2 h-5'>{orderStatus(item.status)}</p>
                                                        <p className=' text-xs'>{format(item.orderedAt, 'MMMM do yyyy, h:mm a')}</p>
                                                    </div>
                                                    {item.status !== 3 ?
                                                        <div className='flex justify-end mt-2 pt-2 items-center border-t-2'>
                                                            <div>
                                                                <p className=' text-xs font-semibold  bg-red-400 pl-2 pr-2 h-5 mr-5'>{UpdateorderStatus(item.status)}</p>
                                                            </div>
                                                            <p
                                                                onClick={() => axiosSubmit(item)}
                                                                className=' cursor-pointer'>Update</p>
                                                        </div> : <></>
                                                    }

                                                </div>
                                            </div>
                                        )
                                    }))
                                }
                                </div> :
                                    <div className='text-center my-20'>
                                        <p className=' text-lg font-bold m-2'> Orders Table is Empty</p>

                                    </div>
                            }
                        </>
                    }
                </>
            }


        </div>
    )
}

export default Admin