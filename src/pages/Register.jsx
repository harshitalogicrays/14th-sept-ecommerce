import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db } from '../firebase/config'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import Loader from '../components/Loader'

const Register = () => {
  let initialState={username:'',email:'',password:'',cpassword:'',role:'user'}
  let [user,setUser]=useState({...initialState})
  let [isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  let registerUser=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async(userCredential) => {
          const user1 = userCredential.user;
          try{
          const docRef=doc(db,"users",user1.uid)
          await setDoc(docRef,{...user,createdAt:Timestamp.now().toDate()})
          setIsLoading(false)
          toast.success("registered successfully")
          navigate('/')
        }
          catch(error){  setIsLoading(false); toast.error(error.message)}
        
    })
    .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
          });
  }
  return (
    <>   
    {isLoading && <Loader/>} 
    <div className='row shadow p-2 mt-5'>
        <div className='col-4'>
          <img src={require('../assets/register.png')} className='img-fluid' />
        </div>
        <div className='col-8'>
          <form onSubmit={registerUser}>
            <div class="mb-3">
              <label for="" class="form-label">Username</label>
              <input type="text" name="username" id="" class="form-control" placeholder="" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">email</label>
              <input type="text" name="email" id="" class="form-control" placeholder="" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">password</label>
              <input type="password" name="password" id="" class="form-control" placeholder="" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
           
            </div>
            <div class="mb-3">
              <label for="" class="form-label">Confirm password</label>
              <input type="password" name="cpassword" id="" class="form-control" placeholder="" value={user.cpassword} onChange={(e)=>setUser({...user,cpassword:e.target.value})}/>
           
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <br/>
            <p>Already an account???  <Link to='/login'>Login</Link></p>
            </form>
        </div>
    </div>
    </>

  )
}

export default Register
