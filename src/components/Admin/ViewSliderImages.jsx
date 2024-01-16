import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhook/useFetchCollection'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectsliders, store_sliders } from '../../redux/sliderSlice'
import { selectCategories } from '../../redux/categoriesSlice'
const ViewSliderImages = () => {
 const {data,isLoading}=useFetchCollection('slider')
 const dispatch=useDispatch()
 useEffect(()=>{
    dispatch(store_sliders(data))
 },[data])
const sliders=useSelector(selectsliders)
 let handleDelete=(id,imageURL)=>{
      deleteObject(ref(storage,imageURL))
      deleteDoc(doc(db,"slider",id))
      toast.success('slider deleted')
 }
  return (
    <div className='container mt-5 shadow p-2'>
        <h1>View Sliders
            <Link
                type="button"
                class="btn btn-info float-end btn-lg" to='/admin/addslider' >
                Add Slider
            </Link>
            
        </h1>
      <div
        class="table-responsive"
      >
        <table
          class="table table-bordered table-striped table-hover"
        >
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">image</th>
              <th>description</th>
              <th>status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {sliders.length==0 && <tr><td colSpan={6}>No slider found</td></tr>}
              {sliders.map((s,i)=>
              <tr key={s.id}>
                <td scope="row">{s.id}</td>
                <td>{s.title}</td>
                <td><img src={s.image} width='50px' height='50px'/></td>
                <td>{s.desc}</td>
                <td>{s.status=='active' ?  <span
                  class="badge rounded-pill text-bg-success"
                  >active</span >
                 :<span
                 class="badge rounded-pill text-bg-danger"
                 >inactive</span >}</td>
                <td>
                <Link type="button" class="btn btn-success me-2" to={`/admin/editslider/${s.id}`}>
                 <FaPenAlt/></Link>
                <button type="button" class="btn btn-danger me-2" onClick={()=>handleDelete(s.id,s.image)}>
                 <FaTrashAlt/>
                 </button>
                </td>
              </tr>
              )}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default ViewSliderImages
