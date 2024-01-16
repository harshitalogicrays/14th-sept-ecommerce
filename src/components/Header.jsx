import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {FaArrowAltCircleLeft, FaHome, FaListUl, FaLock, FaPenAlt, FaSearch, FaShoppingBasket, FaShoppingCart, FaUser} from  'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase/config'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser, logoutuser, selectUserName, selectUserRole } from '../redux/authSlice'
import { ShowOnLogin, ShowOnLogout } from '../pages/HiddenLinks'
import { selectCartItems } from '../redux/cartSlice'
import useFetchCollection from '../customhook/useFetchCollection'
import { selectproducts, store_products } from '../redux/productSlice'
import { FILTER_BY_SEARCH } from '../redux/filterSlice'
const Header = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const username=useSelector(selectUserName)
    const role=useSelector(selectUserRole)

    const {data}=useFetchCollection("products")
    useEffect(()=>{
        dispatch(store_products)
    },[data])
    const products=useSelector(selectproducts)
    const [search,setSearch]=useState(null)
    let handleSearch=(e)=>{
        e.preventDefault()
        dispatch(FILTER_BY_SEARCH({products,search}))
    }
    useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({products,search}))
    },[search])

    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
                try{
                    const docRef=doc(db,"users",user.uid)
                    const docSnap=await getDoc(docRef)
                    if(docSnap.exists()){
                        let obj={userName:docSnap.data().username,userEmail:docSnap.data().email,userRole:docSnap.data().role,userId:user.uid}
                        dispatch(loginuser(obj))
                    }
                  }
                  catch(error){
                    toast.error(error.message)
                  } 
                } else {
                    dispatch(logoutuser())
                }
          });
    },[auth])

    let handleLogout=(e)=>{
        signOut(auth).then(() => {
            toast.success("loggedOut Successfully")
            navigate('/')
          }).catch((error) => {
            toast.error(error.message)
          });
          
    }

    let cartItems=useSelector(selectCartItems)
  return (
   <nav
    class="navbar navbar-expand-sm navbar-dark bg-dark" >
    <div class="container-fluid">
        <a class="navbar-brand" href="#">ecommerce</a>
        <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"  >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link active" to='/' aria-current="page"
                        ><FaHome/>Home
                        <span class="visually-hidden">(current)</span></Link >
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to='/products'><FaShoppingBasket/> Products</Link>
                </li>
                {/* <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="dropdownId"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >Dropdown</a>
                    <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownId"
                    >
                        <a class="dropdown-item" href="#"
                            >Action 1</a  >
                        <a class="dropdown-item" href="#"
                            >Action 2</a >
                    </div>
                </li> */}
            </ul>
            <form class="d-flex my-2 my-lg-0" onSubmit={handleSearch}>
                <div className='input-group'>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Search" name="search" value={search} onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button
                        class="btn btn-danger my-2 my-sm-0"
                        type="submit"
                    >
                        <FaSearch/>
                    </button>
                </div>
            </form>
                <ul class="navbar-nav mt-2 mt-lg-0">
                <li class="nav-item">
                    <Link class="nav-link" to='/cart'><FaShoppingCart size={30}/>
                        <span
                            class="badge rounded-pill text-bg-danger" style={{position:'relative',top:'-10px'}}>{cartItems.length}</span>
                        
                    </Link>
                </li>
                <ShowOnLogout>
                        <li class="nav-item">
                            <Link class="nav-link" to='/register'><FaPenAlt/> Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to='/login'><FaLock/> Login</Link>
                        </li>
                </ShowOnLogout>
                <ShowOnLogin>
                     {role !='admin' &&
                        <li class="nav-item">
                            <Link class="nav-link" to='/myorders'><FaListUl/> My Orders </Link>
                        </li>
                    }
                        <li class="nav-item">
                            <a class="nav-link" href="#"><FaUser/> Welcome {username}</a>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" onClick={handleLogout}><FaArrowAltCircleLeft/> Logout
                            </button>
                        </li>
                </ShowOnLogin>
                </ul>
        </div>
    </div>
   </nav>
   
  )
}

export default Header
