import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
const ChangeOrderStatus = ({id,orderStatus,order}) => {
    let [status,setStatus]=useState(orderStatus)
    let navigate=useNavigate()
    let updateStatus=async(e)=>{
        e.preventDefault()
        const orderConfig={
            userId:order.userId,
            userEmail:order.userEmail,
            totalAmount:order.totalAmount,
            cartItems:order.cartItems,
            shippingaddress:order.shippingaddress,
            OrderStatus:status,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toMillis()
          }
          try{
                await setDoc(doc(db,"orders",id),orderConfig)
                emailjs.send('service_aiakddo', 'template_usu4fd2', 
                {email:orderConfig.userEmail, order_status:orderConfig.OrderStatus,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
                .then((result) => {
                  toast.success("order updated successfully")
                  navigate('/admin/orders')
                }, (error) => {
                    console.log(error.text);
                });
          }
          catch(err){console.log(err.message)}
    }
  return (
    <div className='col-6'>
      <h4>Update Order Status</h4><hr/>
      <form onSubmit={updateStatus}>
        <div class="mb-3">
            <label for="" class="form-label">City</label>
            <select
                class="form-select"
                name="status" value={status} onChange={(e)=>setStatus(e.target.value)}
            >
                <option>Order Placed</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Cancelled</option>
                <option>Delivered</option>
            </select>
            <button
                type="submit"
                class="btn btn-primary mt-3"
            >
                Submit
            </button>
            
        </div>
        
      </form>
    </div>
  )
}

export default ChangeOrderStatus
