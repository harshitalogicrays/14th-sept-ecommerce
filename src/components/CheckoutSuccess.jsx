import React from 'react'
import { FaLongArrowAltLeft} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const CheckoutSuccess = () => {
  return (
    <div className='mt-5 container shadow text-center p-3'>
      <h1 className='text-center'>Thank You for ordering from us.</h1>
      <Link
        type="button"
        class="btn btn-primary" to='/products'
      >
       <FaLongArrowAltLeft/> Continue Shopping
      </Link>
      
    </div>
  )
}

export default CheckoutSuccess
