import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {FaPenAlt, FaPencilAlt, FaTrash, FaTrashAlt} from 'react-icons/fa'

import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../../redux/productSlice'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
const ViewProducts = () => {
   const{data} = useFetchCollection("products")
   const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(store_products({products:data}))
   },[data])
   const products=useSelector(selectproducts)

   let handleDelete=(id,image)=>{
    if(window.confirm("are you sure to delete this??")){
      deleteObject(ref(storage,image))
      deleteDoc(doc(db,"products",id))
      toast.success('product deleted')
    }
   }
  return (
    <div className='container mt-4 shadow'>
      <h2>View Products</h2><hr/>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th>category</th>
              <th>brand</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length==0 && <tr><td colSpan={8}>No product found</td></tr>}
            {products.map((product,i)=>
              <tr key={product.id}>
                <td>{i+1}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td><img src={product.image[0]} height='50px' width='50px'/></td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td> <Link type="button" class="btn btn-success me-2" to={`/admin/editproduct/${product.id}`}>
                 <FaPenAlt/></Link>
                <button type="button" class="btn btn-danger me-2" onClick={()=>handleDelete(product.id,product.image)}>
                 <FaTrashAlt/>
                 </button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewProducts
