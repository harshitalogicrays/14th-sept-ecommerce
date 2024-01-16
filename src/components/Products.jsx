import React, { useEffect } from 'react'
import ProductList from './ProductList'
import useFetchCollection from '../customhook/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../redux/productSlice'
import { selectfilters } from '../redux/filterSlice'

const Products = () => {
  const{data} = useFetchCollection("products")
  const dispatch=useDispatch()
  useEffect(()=>{
   dispatch(store_products({products:data}))
  },[data])
  const products=useSelector(selectproducts)
  const filterProducts=useSelector(selectfilters)
  return (
    <div className='container mt-5'>
      {filterProducts.length==0 ? 
         <ProductList products={products}/>
      :
         <ProductList products={filterProducts}/>
      }
        
    </div>
  )
}

export default Products
