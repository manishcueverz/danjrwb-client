/* eslint-disable no-self-compare */
import React from 'react'
import CartBottomBar from '../components/CartBottomBar'
import HeaderWithBackArrow from '../components/HeaderWithBackArrow'
import CartBox from '../components/CartBox'
import CartHeaderTitle from '../components/CartHeaderTitle'
import { useNavigate } from 'react-router-dom'
import { getCartItems, getCartCout, addProduct, removeProduct, getCartTotal } from "../redux/cartWithOutApiSlice";
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cartProductRV = useSelector(getCartItems)
  const cartCountRV = useSelector(getCartCout)
  const cartTotalRV = useSelector(getCartTotal)

  const addQuntity = (value) => {
    dispatch(addProduct({ id: value }))
  }
  const removeQuntity = (value) => {
    dispatch(removeProduct({ id: value }))
  }

  return (
    <div className='bg-gray-100  min-h-screen'>
      <HeaderWithBackArrow
        pageName={'Cart'}
        navigateRoute={''}
      />
      {
        cartCountRV !== 0 ?
          <>
            <CartHeaderTitle title={'ITEMS'} />
            <CartBox
              children=
              {
                <>
                  {
                    Object.entries(cartProductRV).map(([key, item]) => {
                      return <div className='h-20 flex justify-between mx-auto my-auto'>
                        <img
                          className=' m-2 rounded-xl w-20'
                          src={item.image}
                          alt='' />
                        <div className='my-auto text-start'>
                          <p className=' text-xs'>{item.name}</p>
                          <p className=' text-sm font-bold'>${item.price}</p>
                        </div>
                        <div className="flex justify-around w-20 h-7 border m-5 rounded-full items-center text-center">
                          <svg
                            onClick={() => removeQuntity(key)}
                            className="fill-current text-gray-400 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                          <p className=' text-sm font-bold'>{item.quantity}</p>
                          <svg
                            onClick={() => addQuntity(key)}
                            className="fill-current text-gray-400 w-3" viewBox="0 0 448 512">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </div>
                      </div>
                    })
                  }
                </>
              }
            />
            <CartHeaderTitle title={'ITEM INSTRUCTION'} />
            <CartBox
              children=
              {
                < div className=' m-2'>
                  <p className=' text-xs'> 1 Quntity is 1kg box</p>
                  <p className=' text-xs'> Complimentary added each box with 3 items</p>
                </div>
              }
            />
            <CartHeaderTitle title={'ORDER SUMMARY'} />
            <CartBox
              children=
              {
                <div >
                  <div className=' flex justify-between mx-2'>
                    <p className=' text-xs'> Subtotal</p>
                    <p className=' text-xs'>${cartTotalRV}</p>
                  </div>
                  <div className=' flex justify-between mx-2'>
                    <p className=' text-xs'> GST</p>
                    <p className=' text-xs'>$0.00</p>
                  </div>
                  <div className=' flex justify-between mx-2'>
                    <p className=' text-xs'> Delivery fee</p>
                    <p className=' text-xs'>$0.00</p>
                  </div>
                  {/* <div className=' flex justify-between mx-2'>
                    <p className=' text-xs'> Platfrom fee</p>
                    <p className=' text-xs'>$1</p>
                  </div> */}
                  <hr className=' m-2' />
                  <div className=' flex justify-between mx-2'>
                    <p className=' text-xs'> Grant Total</p>
                    <p className=' text-sm font-bold'>${cartTotalRV}</p>
                  </div>
                </div>
              }
            />
            <CartBottomBar />
          </> :
          <div className='text-center my-20 '>
            <p className=' text-lg font-bold m-2'>Your cart is empty</p>
            <p className=' text-sm'>You will find a products on our " Home page "</p>
            <button
              onClick={() => navigate('/')}
              className={` h-10 w-24 mt-5 bg-yellow-200  border rounded-full text-xs font-semibold `}
            >Home Page
            </button>
          </div>
      }
    </div>
  )
}

export default Cart