import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const HeaderWithBackArrow = ({ pageName, navigateRoute }) => {

    const navigate = useNavigate();

    return (
        <div className='h-14 w-full mb-4  flex justify-between items-center p-3 sticky top-0 bg-white '>
            <BiArrowBack size={25}
                onClick={() => navigate(`/${navigateRoute}`)}
            />
            <p className=' text-lg font-semibold'>{pageName}</p>
        </div>
    )
}

export default HeaderWithBackArrow