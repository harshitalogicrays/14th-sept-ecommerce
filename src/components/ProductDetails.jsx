import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectproducts } from '../redux/productSlice'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/cartSlice'
import ImageThumbnail from './ImageThumbnail'

const ProductDetails = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const products=useSelector(selectproducts)
    const product=products.find((item)=>item.id==id)

    const cartData=useSelector(selectCartItems)
    const itemIndex=cartData.findIndex(item=>item.id==id)
    const item=cartData.find(item=>item.id==id)
  return (
    <div className='container mt-5'>
        <div className='row shadow p-4'>
            <div className='col-6'>
                {/* <img src={product.image[0]} className='img-fluid' width='400px' height='300px'/> */}
                <ImageThumbnail imgs={product.image}/>
            </div>
            <div className='col-6 mt-4'>
                <h4>
                 
                {product.stock > 0 ? 
                <span class="badge rounded-pill text-bg-success float-end">In Stock</span>
                :
                <span class="badge rounded-pill text-bg-danger float-end">Out of Stock</span>
                 }</h4>
                 <h4>{product.name}   </h4>
                <p>{product.category}<br/>
                {product.brand}<br/>
                ${product.price}</p>
                <p>{product.description}</p>
                {itemIndex == -1 ?
                <button type="button" class="btn btn-danger"  
                onClick={()=>dispatch(ADD_TO_CART(product))}>
                    Add to cart
                </button>
                :
                <>
                 <button onClick={()=>dispatch(DECREASE(item))}>-</button>
                <input type="text" style={{width:'40px',textAlign:'center'}} value={item.cartQuantity} readOnly/>
                <button onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
                </>
                }
                
            </div>
        </div>      
    </div>
  )
}

export default ProductDetails
