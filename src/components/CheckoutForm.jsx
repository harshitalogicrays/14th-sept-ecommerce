import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART, selectCartItems, selectTotalAmount } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { selectUserEmail, selectUserId } from "../redux/authSlice";
import { selectShippingAddress } from "../redux/checkoutSlice.";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const disptach=useDispatch() 
  const navigate=useNavigate()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  
  }, [stripe]);

  const userId=useSelector(selectUserId)
  const userEmail=useSelector(selectUserEmail)
  const totalAmount=useSelector(selectTotalAmount)
  const cartItems=useSelector(selectCartItems)
  const shippingaddress=useSelector(selectShippingAddress)
  const saveorder=async()=>{
      const today=new Date()
      const date=today.toLocaleDateString();
      const time=today.toLocaleTimeString()
      const orderConfig={
        userId,userEmail,totalAmount,cartItems,shippingaddress,OrderStatus:"Order Placed",orderDate:date,orderTime:time,createdAt:Timestamp.now().toMillis()
      }
      try{
          const docref=collection(db,"orders");
          await addDoc(docref,orderConfig)
          disptach(EMPTY_CART())
          emailjs.send('service_aiakddo', 'template_usu4fd2', {email:orderConfig.userEmail, order_status:orderConfig.OrderStatus,amount:orderConfig.totalAmount}, 'ouyyULNr1Fl9QYxiJ')
          .then((result) => {
            toast.success("order placed")
            navigate('/checkout-success')
          }, (error) => {
              console.log(error.text);
          });
        
      }
      catch(err){console.log(err.message)}
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect:"if_required"
    }).then((result)=>{
        if(result.error){
          toast.error(result.error.message)
          setMessage(result.error.message)
          return 
        }
        if(result.paymentIntent){
          if(result.paymentIntent.status=="succeeded"){
            setIsLoading(false)
            toast.success('payment success')
            saveorder()
          }
        }
    })


    
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="container col-8 mt-5">
    <div className="row shadow p-2 ">
        <div className="col-6"><CheckoutSummary/></div>
        <div className="col-6">
            <h1>Checkout Payment </h1> <hr/>
        <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <div class="d-grid gap-2 mt-3">
        <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary">
        <span id="button-text">
            {isLoading ? <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div> : "Pay now"}
        </span>
        </button>
</div>


{/* Show any error or success messages */}
{message && <div id="payment-message">{message}</div>}
</form>
        </div>
    </div>
    </div>
  );
}