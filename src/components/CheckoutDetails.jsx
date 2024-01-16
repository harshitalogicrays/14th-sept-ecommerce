import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'
import { selectShippingAddress, store_checkouts } from '../redux/checkoutSlice.'

const CheckoutDetails = () => {
    let initialState={name:'',mobile:'',line1:'',line2:'',city:'',state:'',country:'',pincode:''}
    let [shippingAdd,setShippingAdd]=useState(initialState)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let handleAdd=(e)=>{
        setShippingAdd({...shippingAdd,[e.target.name]:e.target.value})
    }
    let handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(store_checkouts(shippingAdd))
        navigate('/checkout')
    }

    let ShippingAddress=useSelector(selectShippingAddress)
    useEffect(()=>{
        if(ShippingAddress !=''){setShippingAdd({...ShippingAddress})}
    },[ShippingAddress])
  return (
    <div className='container'>
    <div className='row mt-5 p-2 shadow'>
        <div className='col-6'>
            <h1>Checkout Details</h1><hr/>
            <form onSubmit={handleSubmit}>
                <div className='row'>
            <div class="mb-3 col-6" >
                <label for="" class="form-label"> Recipient Name</label>
                <input
                    type="text"
                    name="name"
                    id=""
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                    value={shippingAdd.name}
                    onChange={handleAdd}
                />
                
            </div>
            <div class="mb-3 col-6">
                <label for="" class="form-label">Mobile number</label>
                <input
                    type="number"
                    name="mobile"
                    id=""
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                    value={shippingAdd.mobile}
                    onChange={handleAdd}
                />
            </div></div>
            <div className='row'>
            <div class="mb-3 col-6">
                <label for="" class="form-label"> Address1</label>
                <input
                    type="text"
                    name="line1"
                    id=""
                    class="form-control"
                    placeholder="Line 1"
                    aria-describedby="helpId"
                    value={shippingAdd.line1}
                    onChange={handleAdd}
                /></div>
                <div className='mb-3 col-6'>  
                <label for="" class="form-label"> Address2</label>
                <input
                    type="text"
                    name="line2"
                    id=""
                    class="form-control"
                    placeholder="Line 2"
                    aria-describedby="helpId"
                    value={shippingAdd.line2}
                    onChange={handleAdd}
                /></div>

            </div>
            <div className='row'>
            <div class="mb-3 col-6">
                <label for="" class="form-label"> City</label>
                <input
                    type="text"
                    name="city"
                    id=""
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                    value={shippingAdd.city}
                    onChange={handleAdd}
                />
                
            </div>
            <div class="mb-3 col-6">
                <label for="" class="form-label">State</label>
                <input
                    type="text"
                    name="state"
                    id=""
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                    value={shippingAdd.state}
                    onChange={handleAdd}
                />
                
            </div></div>
            <div class="mb-3">
                <label for="" class="form-label"> Country</label>    
                 <CountryDropdown className='form-select' value={shippingAdd.country}
                 onChange={(val)=>setShippingAdd({...shippingAdd,country:val})} valueType="short"/>         
            </div>
            <div class="mb-3">
                <label for="" class="form-label"> Pin code</label>
                <input
                    type="number"
                    name="pincode"
                    id=""
                    class="form-control"
                    placeholder=""
                    aria-describedby="helpId"
                    value={shippingAdd.pincode}
                    onChange={handleAdd}
                />
                
            </div>
            <button
                type="submit"
                class="btn btn-primary"
            >
                Proceed to Checkout
            </button>
            
        </form>
        </div>
        <div className='col-6'>
            <CheckoutSummary/>
        </div>
    </div>
    </div>
  )
}

export default CheckoutDetails
