import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectTotalAmount } from '../redux/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const total=useSelector(selectTotalAmount)
  return (
    <>
    <h1>Checkout Summary</h1><hr/>
    <div className="card p-2">
        <h5>Total Products: {cartItems.length} </h5>
        <h5>Total Amount: {total}</h5>
    </div>
    {cartItems.map((cart)=>
        <div className="card p-2">
            <p>product: {cart.name}<br/>
               quantity:{cart.cartQuantity}<br/>
               unit price:{cart.price}
            </p>
        </div>
    )}
    </>
  )
}

export default CheckoutSummary
