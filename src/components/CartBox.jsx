import React from 'react'

const CartBox = ({ children }) => {
    return (
        <div className=' text-center items-center bg-white p-2 m-4 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'>
            {children}
        </div>
    )
}

export default CartBox