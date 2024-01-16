import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, store_categories } from '../../redux/categoriesSlice'
import { toast } from 'react-toastify'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ViewCategories = () => {
    const {data,isLoading}=useFetchCollection("categories")
     const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(store_categories(data))
    },[data])

    const categories=useSelector(selectCategories)

    let handleDelete=async(id)=>{
        if(window.confirm('are you sure to delete??')){
            try{
                const docref=doc(db,"categories",id)
                await deleteDoc(docref)
                toast.success("category deleted")
            }
            catch(err){toast.error(err.message)}
        }
    }
  return (
    <div className='container mt-5'>
        {isLoading && <h1>Loading....</h1>}
        <div className="card">
            <div className='card-header'>
                <h3>View Categories 
                    <Link to='/admin/addcategory' type="button" class="btn btn-primary float-end"> Add Category </Link>                 
                </h3>
            </div>
            <div className='card-body'>
                <div class="table-responsive" >
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length==0  && <tr><td colSpan={4}>No Category Found</td></tr>}
                            {categories.map((c,i)=>
                            <tr key={c.id}>
                                <td scope="row">{c.id}</td>
                                <td>{c.title}</td>
                                <td>{c.desc}</td>
                                <td>
                                    <Link type="button" class="btn btn-success me-2"
                                    to={`/admin/editcat/${c.id}`}>
                                        <FaPenAlt/>
                                    </Link>
                                    <button type="button" class="btn btn-danger me-2" onClick={()=>handleDelete(c.id)}>
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ViewCategories
