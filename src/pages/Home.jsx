import React from 'react'
import Slider from './Slider'
import Products from '../components/Products'
import Loader from '../components/Loader'

const Home = () => {
  return (
  <>
    <Slider/>
    <div className='container'>
        <Products/>
    </div>
  </>
  )
}

export default Home
