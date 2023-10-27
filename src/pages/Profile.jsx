import React from 'react'
import HeaderWithBackArrow from '../components/HeaderWithBackArrow'
import CartBox from '../components/CartBox'
import { Avatar } from '@material-ui/core'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { LiaAddressBook } from "react-icons/lia"
import { IoIosLogOut } from "react-icons/io"
import { MdOutlineFeedback } from "react-icons/md"
import { HiBookmark } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserName, getUserDeliveryAddress, getUserMobile } from "../redux/userInfoSlice";

const Profile = () => {

  const navigate = useNavigate();
  const userMobile = useSelector(getUserMobile)
  const userName = useSelector(getUserName)
  const userDeliveryAddress = useSelector(getUserDeliveryAddress)

  const logOut = () => {
    localStorage.clear()
    navigate('/signin')
  }
  return (
    <div className='bg-gray-100 pb-5 min-h-screen'>
      <HeaderWithBackArrow
        pageName={'Profile'}
        navigateRoute={''}
      />
      <CartBox
        children={
          <>
            <div className='h-20 w-full flex justify-between items-center p-3 bg-white '>
              <div
                className='flex items-center'>
                <Avatar
                  name="Manish"
                  size="50"
                  round={true}
                  color='gray'
                />
                <div
                  className=' ml-5 text-start'>
                  <p className=' text-lg font-bold'>{userName}</p>
                  <p className=' text-sm '>{userMobile}</p>
                  <p className=' text-xs '>{userDeliveryAddress !== '' ? userDeliveryAddress : "No Address"}</p>
                </div>
              </div>

            </div>
          </>
        }
      />
      <CartBox
        children={
          <>
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
              <div
                className='flex items-center'>
                <AiOutlineShoppingCart size={25} />
                <div
                  onClick={() => navigate('/profile/orders')}
                  className=' ml-5 text-start'>
                  <p className=' text-sm font-bold'>My Orders</p>
                  <p className=' text-xs text-gray-400'>Keep track of your orders</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
              <div
                onClick={() => navigate('/profile/address')}
                className='flex items-center'>
                <LiaAddressBook size={25} />
                <div
                  className=' ml-5 text-start'>
                  <p className=' text-sm font-bold'>Deliver Address</p>
                  <p className=' text-xs text-gray-400'>Update your delivery address</p>
                </div>
              </div>
            </div>
          </>
        }
      />
      <CartBox
        children={
          <>
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
              <div
                className='flex items-center'>
                <HiBookmark size={25} />
                <div
                  className=' ml-5 text-start'>
                  <p className=' text-sm font-bold'>About</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
              <div
                className='flex items-center'>
                <MdOutlineFeedback size={25} />
                <div
                  className=' ml-5 text-start'>
                  <p className=' text-sm font-bold'>Send Feedback</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
              <div
                className='flex items-center'>
                <IoIosLogOut size={25} />
                <div
                  onClick={() => logOut()}
                  className=' ml-5 text-start'>
                  <p className=' text-sm font-bold'>Logout</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Profile