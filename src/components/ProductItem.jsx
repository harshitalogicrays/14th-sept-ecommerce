import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ADD_TO_CART } from '../redux/cartSlice'

const ProductItem = ({product}) => {
    const dispatch=useDispatch()
   return (
    <div className='col-3 mb-3'>
        <div class="card">
            <Link to={`/product-details/${product.id}`}>
            <img class="card-img-top" src={product.image} alt={product.name} height='200px'/></Link>
            <div class="card-body">
                <h4 class="card-title">{product.name}</h4>
                <p class="card-text">{product.price}</p>
                <p class="card-text">{product.qty}</p>
                <button type="button" class="btn btn-danger me-2" 
                onClick={()=>dispatch(ADD_TO_CART(product))}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default ProductItem
