/* eslint-disable no-self-compare */
import React, { useEffect } from 'react'
import HeaderWithBackArrow from '../components/HeaderWithBackArrow'
import SearchBox from '../components/SearchBox'
import { useNavigate } from 'react-router-dom'
import OrderCard from '../components/OrderCard'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders, fetchOrdersList, getOrdersError, getOrdersStatus } from "../redux/orderListSlice";

const OrdersList = () => {

  const navigate = useNavigate();
  const ordersListRV = useSelector(getOrders)
  const ordersListStatusRV = useSelector(getOrdersStatus);
  const ordersListFetchEoorRV = useSelector(getOrdersError);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrdersList())
  }, [dispatch])

  return (
    <div className='bg-gray-100 pb-5 min-h-screen'>
      <HeaderWithBackArrow
        pageName={'Orders'}
        navigateRoute={'profile'}
      />
      <SearchBox />
      {
        ordersListStatusRV === 'loading' ? <p className=' text-center'>Loading...</p> : <>
          {
            ordersListFetchEoorRV !== null ? <p>{ordersListStatusRV}</p> : <>
              {
                ordersListRV.length !== 0 ? <div className=' mt-5'>{
                  ordersListRV.map((item => {
                    return <OrderCard value={item} />
                  }))
                }
                </div> :
                  <div className='text-center my-20'>
                    <p className=' text-lg font-bold m-2'>Your Orders is empty</p>
                    <p className=' text-sm'>You will find a products on our " Home page "</p>
                    <button
                      onClick={() => navigate('/')}
                      className={` h-10 w-24 mt-5 bg-yellow-200  border rounded-full text-xs font-semibold `}
                    >Home Page
                    </button>
                  </div>
              }
            </>
          }
        </>
      }
    </div>
  )
}

export default OrdersList