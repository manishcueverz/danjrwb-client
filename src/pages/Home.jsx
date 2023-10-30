import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { getProduct, getProductError, getProductStatus } from "../redux/productSlice";
import { useIsMobile } from '../hooks/useInMobile'

const Home = () => {

  const productsRV = useSelector(getProduct)
  const productsStatusRV = useSelector(getProductStatus);
  const productsFetchEoorRV = useSelector(getProductError);
  const [productsList, setproductsList] = useState([]);

  useEffect(() => {
    if ((productsStatusRV === 'succeeded')) {
      setproductsList(productsRV)
    }
  }, [productsRV, productsStatusRV])

  const isMobile = useIsMobile()

  return (
    <>
      {
        isMobile ?
          <div className='bg-gray-100 pb-5 min-h-screen'>
            <Header />
            <SearchBox />
            <Banner />
            <p className=' text-center mx-20 text-gray-400 text-xs tracking-wider'>WE PROVIDE ONLY CHIKEN BIRIYANI AND MOTTON BIRIYANI</p>
            <hr className=' m-7' />
            {
              productsStatusRV === 'loading' ? <p className=' text-center'>Loading...</p> : <>
                {
                  productsFetchEoorRV !== null ? <p>{productsFetchEoorRV}</p> : <>
                    {
                      productsList.map((item => {
                        return <ProductCard value={item} />
                      }))
                    }
                  </>
                }
              </>
            }
            <hr className=' m-7' />
            <p className=' text-center mx-20 text-gray-400 text-xs tracking-wider'>FRESH QUALITY WEDDING BIRIYANI</p>
          </div>
          : <p className=' text-center'>THIS SITE ONLY SHOW MOBILE SCREEB SIZE</p>
      }
    </>

  )
}

export default Home