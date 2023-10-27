import React, { useState } from 'react'
import HeaderWithBackArrow from '../components/HeaderWithBackArrow'
import CartBox from '../components/CartBox'
import { useDispatch } from 'react-redux'
import { updateDeluiveryAddress } from "../redux/userInfoSlice";
import { useNavigate } from 'react-router-dom'

const Address = () => {
  const dispatch = useDispatch()
  const [buildingNo, setBuildingNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const navigate = useNavigate();

  const updateAddress = () => {
    if (buildingNo !== '' && streetName !== '' && city !== '' && pincode !== '') {
      var address = buildingNo + ',' + streetName + ',' + city + ',' + pincode + '.' 
      dispatch(updateDeluiveryAddress(address))
      navigate('/')
    }else{
      console.log('all dat needed')
    }
  }

  return (
    <div className='bg-gray-100 pb-5 min-h-screen'>
      <HeaderWithBackArrow
        pageName={'Address'}
        navigateRoute={''}
      />
      <CartBox
        children=
        {
          <>

            <form className=' m-5'>
              <div class="mb-6">
                <label
                  for="build-no"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-start">
                  Building no
                </label>
                <input
                  type="build-no"
                  id="build-no"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={buildingNo}
                  onChange={(e) => setBuildingNo(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label
                  for="street-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-start">
                  Street name
                </label>
                <input
                  type="street-name"
                  id="street-name"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-start">
                  City
                </label>
                <input
                  type="city"
                  id="city"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label
                  for="zipcode"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-start">
                  Pincode
                </label>
                <input
                  type="zipcode"
                  id="zipcode"
                  class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <button
                onClick={() => updateAddress()}
                type="button" class="text-black bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>
          </>
        }
      />
    </div>
  )
}

export default Address