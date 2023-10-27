import React from 'react'
import { ImLocation } from "react-icons/im"
import { useNavigate } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai"
import Badge from '@material-ui/core/Badge';
import { BsPerson } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { getCartCout } from "../redux/cartWithOutApiSlice";
import { getUserName, getUserDeliveryAddress } from "../redux/userInfoSlice";

const Header = () => {
  const navigate = useNavigate();
  const cartCountRV = useSelector(getCartCout)
  const userName = useSelector(getUserName)
  const userDeliveryAddress = useSelector(getUserDeliveryAddress)
  return (
    <>
      <div className='h-20 w-full  flex justify-between items-center p-3 sticky top-0 bg-white '>
        <div
          onClick={() => navigate('/profile/address')}
          className='flex items-center'>
          <ImLocation size={30} color='yellow' />
          <div
            onClick={() => navigate('/profile/address')}
            className=' ml-5'>
            <p className=' text-lg font-bold'>{userName !== '' ? userName : "Empty"}</p>
            <p className=' text-xs '>{userDeliveryAddress !== '' ? userDeliveryAddress : "No Address"}</p>
          </div>
        </div>
        <div className=' flex justify-center items-center'>

          <Badge badgeContent={cartCountRV}
            color="primary">
            <AiOutlineShoppingCart
              onClick={() => navigate('/cart')}
              size={27} />
          </Badge>
          {/* <AiOutlineMenu
            onClick={() => navigate('/profile')}
            className=' ml-5'
            size={30} /> */}
          <BsPerson
            onClick={() => navigate('/profile')}
            className=' ml-5'
            size={27} />
          {/* <Avatar
            name="Manish"
            size="50"
            round={true}
            color='gray'
            onClick={() => navigate('/profile')}
          /> */}
        </div>
      </div>
    </>
  )
}

export default Header