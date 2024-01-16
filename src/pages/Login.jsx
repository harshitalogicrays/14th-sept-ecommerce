import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import { selectURL } from '../redux/cartSlice'

const Login = () => {
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [isLoading,setIsLoading]=useState(false)
   let navigate= useNavigate()
 
   let redirect=useSelector(selectURL)
   let redirectURL=()=>{
      if(redirect.includes('cart')){
        navigate('/cart')
      }
      else navigate('/')
   }
 
 
   let loginUser=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
        const user = userCredential.user;
          try{
            const docRef=doc(db,"users",user.uid)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
              let role=docSnap.data().role
              if(role=="admin"){
                setIsLoading(false)
                toast.success("loggedIn Successfully")
                navigate('/admin')
              }
              else if(role=="user"){
                setIsLoading(false)
                toast.success("loggedIn Successfully")
                // navigate('/')
                redirectURL()
              }
            }
          }
          catch(error){
            setIsLoading(false); toast.error(error.message)
          }
            
    })
    .catch((error) => {
         setIsLoading(false)
        toast.error(error.message)
    });
    
  }
  const provider = new GoogleAuthProvider();
  let loginwithgoogle=()=>{
    signInWithPopup(auth, provider)
    .then(async(result) => {
         const user = result.user;
         try{
          const docRef=doc(db,"users",user.uid)
          await setDoc(docRef,{username:user.displayName,email:user.email,role:"user",createdAt:Timestamp.now().toDate()})
          toast.success("loggedIn Successfully")
          // navigate('/')
          redirectURL()
         }
         catch(error){toast.error(error.message)}
          }).catch((error) => {
            toast.error(error.message)
    });
  }
  return (
    <div className='row shadow p-2 mt-5'>
      {isLoading && <Loader/>}
    <div className='col-4 offset-1'>
      <img src={require("../assets/login.png")} className='img-fluid' />
    </div>
    <div className='col-6'>
      <form onSubmit={loginUser}>
        <div class="mb-3">
          <label for="" class="form-label">email</label>
          <input type="text" name="email" id="" class="form-control" placeholder="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
       
        </div>
        <div class="mb-3">
          <label for="" class="form-label">password</label>
          <input type="password" name="password" id="" class="form-control" placeholder="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
       
        </div>
      <div class="d-grid gap-2">
        <button type="submit" name="" id="" class="btn btn-primary">Login</button>
      </div>
      <hr/>
      <div class="d-grid gap-2">
        <button type="button" name="" id="" class="btn btn-danger" onClick={loginwithgoogle}>Login with Google</button>
      </div>
      <hr/>
        <p>create an account???  <Link to='/register'>Register</Link></p>
        </form>
    </div>
</div>
  )
}

export default Login
