import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
const AdminDashboard = () => {
  return (
    <div className='row'>
    <div className='col-2'>
    <ul class="nav nav-pills flex-column mb-5">
  <li class="nav-item">
    <Link to='/admin' class="nav-link link-dark text-center">
          <h1 className='text-center'><FaUserCircle size={45}/></h1>
            Dashboard
    </Link>
  </li>
  <hr/>
  <li>
    <Link to='/admin/viewcategories' class="nav-link link-dark text-center">
          View Categories
    </Link>
  </li><hr/>
  <li>
    <Link to='viewsliders' class="nav-link link-dark text-center">
          View Slider 
    </Link>
  </li><hr/>
  <li>
    <Link to='addproduct' class="nav-link link-dark text-center">
          Add Product
    </Link>
  </li><hr/>
  <li>
    <Link to='viewproducts' class="nav-link link-dark text-center">
          View Products
    </Link>
  </li><hr/>
  <li>
  <Link to='viewusers' class="nav-link link-dark text-center">
          View Users
    </Link>
  </li><hr/>
  <li>
    <Link to='orders' class="nav-link link-dark text-center">
        View Orders
    </Link>
  </li>
</ul>
    </div>
    <div className='col-10'>
      <Outlet/>
    </div>
</div>
  )
}

export default AdminDashboard
