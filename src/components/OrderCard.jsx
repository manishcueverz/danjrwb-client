import { format } from 'date-fns'
import React from 'react'

const OrderCard = ({ value }) => {

    const Product = ({ item }) => {
        return (
            <div className=' flex justify-between'>
                <p className=' text-xs'>{item.name}</p>
                <p className=' text-xs'>{item.quantity} x ${item.price}</p>
            </div>
        )
    }

    return (
        <div className='  bg-white rounded-xl ml-4 mr-4 mt-2 p-4'>
            <div className=''>
                <div className=' border-b-2 pb-2  flex justify-between mb-2'>
                    <div>
                        <p className=' text-xs font-semibold'>OrderID:#{value._id}</p>
                        <p className=' text-xs'>{format(value.orderedAt, 'MMMM do yyyy, h:mm a')}</p>
                    </div>
                    <p className=' text-xs font-semibold  bg-yellow-200  pl-2 pr-2 h-5'>{value.status === 1 ? 'Waiting' : 'Approved'}</p>
                </div>
                {value.products.map((ite => <Product item={ite} />))}
                <div className='flex justify-end mt-2 pt-2 items-center border-t-2'>

                    <p className=' text-sm font-bold'>${value.totalPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderCard