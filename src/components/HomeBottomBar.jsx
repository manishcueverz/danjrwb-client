import React from 'react'
import Badge from '@material-ui/core/Badge';
import { useNavigate } from 'react-router-dom'

const HomeBottomBar = ({ activeTab }) => {

    const navigate = useNavigate();

    return (
        <div className=' text-lg font-semibold shadow-lg sticky bottom-0 h-14 rounded-lg bg-white flex items-center justify-around'>
            <p
                className={`${activeTab === 'home' ? "border-t-4 border-yellow-200" : ""}`}
                onClick={() => navigate('/')}
            >Home</p>
            <Badge badgeContent={9}
                color="primary">
                <p
                    className={`${activeTab === 'cart' ? "border-t-4 border-yellow-200" : ""}`}
                    onClick={() => navigate('/cart')}
                >Cart</p>
            </Badge>
        </div>
    )
}

export default HomeBottomBar