import express from 'express'
import cors from 'cors'
import Stripe  from 'stripe'
let stripe=new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX')

const app=express()
app.use(express.json())
app.use(cors())
//http://localhost:1000
app.get("/",(req,res)=>{
    res.send("hello from server")
})
//http://localhost:1000/create-payment-intent
app.post("/create-payment-intent", async (req, res) => {
  console.log(req.body)
    const { items,totalAmount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
const PORT=1000
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`))