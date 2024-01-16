import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalAmount } from '../redux/cartSlice';
const stripePromise = loadStripe("pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw");

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [message,setMessage]=useState("Initializing Checkout")
    const items=useSelector(selectCartItems)
    const totalAmount=useSelector(selectTotalAmount)
    useEffect(() => {
        fetch("http://localhost:1000/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items,totalAmount}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    
      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    
      return (
        <div className="App">
            {!clientSecret && <h1>{message}</h1>}
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      );
    }

export default Checkout
