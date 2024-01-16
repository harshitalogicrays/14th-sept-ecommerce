import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectTotalAmount } from '../redux/cartSlice'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/authSlice'

const Cart = () => {
    const cart=useSelector(selectCartItems)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(CALCULATE_TOTAL())
    },[cart])
    const totalAmount=useSelector(selectTotalAmount)

    const navigate=useNavigate()
    const isloggedIn=useSelector(selectIsLoggedIn)
    let url=window.location.href
    let handleCheckout=()=>{
      if(isloggedIn)
          navigate('/checkout-details')
      else {
          navigate('/login')
          dispatch(SAVE_URL(url))
      }
        
    }
  return (
    <div className='container mt-5 shadow p-3'>
    <h1>Cart Page </h1> <hr/>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Name</th>
            <th>Image</th>
            <th scope="col">Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.length==0 && <tr><td colSpan={7}>No Item in Cart</td></tr>}
          {cart.map((c,i)=>
            <tr class="">
              <td scope="row">{i+1}</td>
              <td>{c.name}</td>
              <td><img src={c.image} height='50px' width='50px' /></td>
              <td scope="row">{c.price}</td>
              <td>
                <button onClick={()=>dispatch(DECREASE(c))}>-</button>
                <input type="text" style={{width:'40px',textAlign:'center'}} value={c.cartQuantity} readOnly/>
                <button onClick={()=>dispatch(ADD_TO_CART(c))}>+</button>
                </td>
              <td>{c.cartQuantity * c.price}</td>
              <td>
                <button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(i))}><FaTrash/></button>
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className='row'>
      <div className='col-8'>
        <button type="button" class="btn btn-danger btn-lg"  onClick={()=>dispatch(EMPTY_CART())}
       >Empty Cart</button>
      </div>
      <div className='col-4'>
            <div className="card">
              <h2>Total: <span class="float-end">${totalAmount}</span></h2><hr/>
              <button type="button" class="btn btn-warning" onClick={handleCheckout}>Checkout</button>
            </div>
      </div>
      </div>
  </div>
  )
}

export default Cart
