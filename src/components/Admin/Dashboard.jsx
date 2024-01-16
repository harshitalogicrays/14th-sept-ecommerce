import React from 'react'
import useFetchCollection from '../../customhook/useFetchCollection'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const {data}=useFetchCollection("products")
  return (
    <div className='row mt-5'>
        <div className='col-3'>
            <div className='card bg-info'>
                <h1 className='text-center'>
                    Total Products<br/>
                    {data.length}
                </h1>
                <div class="d-grid gap-2">
                    <Link to='/admin/viewproducts'
                        type="button"
                        name=""
                        id=""
                        class="btn btn-danger m-3"
                    >
                        View
                    </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Dashboard
