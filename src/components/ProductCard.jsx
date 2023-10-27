import React from 'react'
import { addProduct, removeFromCart, getCartItems } from "../redux/cartWithOutApiSlice";
import { useSelector, useDispatch } from 'react-redux'

const ProductCard = ({ value }) => {
    const dispatch = useDispatch()
    const cartProductRV = useSelector(getCartItems)
    const addToCart = (value) => {
        dispatch(addProduct(
            {
                id: value._id,
                name: value.name,
                price: value.price,
                image: value.images,
            }
        ))
    }
    const removeToCart = (value) => {
        dispatch(removeFromCart({ id: value._id }))
    }
    return (
        <div className='bg-white h-32 m-5 flex shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg'>
            <div className='w-1/3 relative  '>
                <img src={value.images} alt='' className='absolute h-32 rounded-lg shadow-2xl' />
            </div>
            <div className='w-2/3 items-start text-center my-auto'>
                <p className=' font-semibold text-sm'>{value.name}</p>
                <p className=' text-gray-400 text-sm'>1 kg x 1 box - price ${value.price}</p>
                <hr className=' m-3' />
                <button
                    className={`${cartProductRV[value._id] ? "bg-slate-300 " : "bg-yellow-200 "}text-black  border p-2 rounded-full text-xs w-40 font-semibold `}
                    onClick={() => cartProductRV[value._id] ? removeToCart(value) : addToCart(value)}
                >{cartProductRV[value._id] ? 'REMOVE TO CART' : 'ADD TO CART'}
                </button>
            </div>
        </div>
    )
}

export default ProductCard