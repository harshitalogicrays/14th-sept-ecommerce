import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useSelector } from 'react-redux'
import { selectCategories } from '../../redux/categoriesSlice'

const AddCategory = () => {
    const {id}=useParams()
    let navigate=useNavigate()
    let [category,setCategory]=useState({title:'',desc:''})
    let handleSubmit=async(e)=>{
        e.preventDefault()
        if(!id){
            try{
                const docRef=collection(db,"categories")
                await addDoc(docRef,{...category,createdAt:Timestamp.now().toDate()})
                toast.success("category added")
                navigate('/admin/viewcategories')
            }
            catch(err){toast.error(err.message)}
         }
         else{
            try{
                const docRef=doc(db,"categories",id)
                await setDoc(docRef,{title:category.title,desc:category.desc,
                    createdAt:category.createdAt,
                    editedAt:Timestamp.now().toDate()})
                toast.success("category updated")
                navigate('/admin/viewcategories')
            }
            catch(err){toast.error(err.message)}
         }
    }

    const allcategories=useSelector(selectCategories)
    const categoryEdit=allcategories.find((item)=>item.id==id)
    console.log(categoryEdit)
    useEffect(()=>{
        if(id){setCategory({...categoryEdit})}
        else{setCategory({title:'',desc:''})}
    },[id])
  return (
    <div className='container mt-5'>
    <div className="card">
        <div className='card-header'>
            <h3>{id?"Edit":"Add"} category 
                <Link to='/admin/viewcategories' type="button" class="btn btn-danger float-end"> View Categories</Link>                 
            </h3>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="" class="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        class="form-control" value={category.title}
                        onChange={(e)=>setCategory({...category,title:e.target.value})}
                    />
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Description</label>
                    <textarea class="form-control" name="desc" rows="3" value={category.desc}
                        onChange={(e)=>setCategory({...category,desc:e.target.value})}>{category.desc}</textarea>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    {id ? "Update":"Submit"}
                </button>
                
          </form>           
        </div>
    </div>
</div>
  )
}

export default AddCategory
