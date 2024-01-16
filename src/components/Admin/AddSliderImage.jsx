import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase/config'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { selectsliders } from '../../redux/sliderSlice'
const AddSliderImage = () => {
    const {id}=useParams()
    const [slider,setSlider]=useState({title:'',image:'',desc:'',status:''})
    const [isLoading,setIsLoading]=useState(false)
    const [uploadProgress,setUploadProgress]=useState(0)
    const redirect=useNavigate()
    const sliders=useSelector(selectsliders)
    let sliderEdit=sliders.find((item)=>item.id==id)
  
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
    
        if(id){setSlider({...sliderEdit}) 
        setIsActive(sliderEdit.status=="active"?true:false)
    }
        else{setSlider({title:'',image:'',desc:'',status:''})}
    },[id])
    let handleImage=(e)=>{
            let file=e.target.files[0]
           const storageRef= ref(storage,`14thsept-slider-images/${Date.now()}`)
           const uploadTask=uploadBytesResumable(storageRef,file)
           uploadTask.on("state_changed",(snapshot)=>{
                let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
                setUploadProgress(progress)
           },(error)=>{toast.error(error.message)},
           ()=>{
               getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                    setSlider({...slider,image:url})
                    console.log(url)
               }) 
           }
           )
    }
    let handleSubmit=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        if(!id){ //add
                try{
                    const docRef=collection(db,"slider")
                    await addDoc(docRef,{title:slider.title,
                        image:slider.image,
                        desc:slider.desc,
                        status:isActive?"active":"inactive",createdAt:Timestamp.now().toMillis()})
                    toast.success("slider image added")
                    redirect('/admin/viewsliders')
                }
                catch(err){toast.error(err.message)}
            }
        else {
                if(slider.image != sliderEdit.image){
                    deleteObject(ref(storage,sliderEdit.image))
                }
                const docRef=doc(db,"slider",id)
                await setDoc(docRef,{title:slider.title,
                                        image:slider.image,
                                        desc:slider.desc,
                                        status:isActive?"active":"inactive",
                                        createdAt:sliderEdit.createdAt,
                                        editedAT:Timestamp.now().toMillis()
                                        })
             toast.success("slider image updated")
             redirect('/admin/viewsliders')

        }
    }
    return (
        <div className='container mt-5 shadow  p-2'>
            <h1>{id ?"Edit":"Add"} Slider
                <Link
                    type="button"
                    class="btn btn-info float-end btn-lg" to='/admin/viewsliders' >
                    View Sliders
                </Link>

            </h1>

            <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        name="title"
                        placeholder="" value={slider.title} onChange={(e)=>setSlider({...slider,title:e.target.value})}
                    />
                    <label for="formId1">Title</label>
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Choose file</label>
                    <input
                        type="file"
                        class="form-control"
                        name="image" onChange={handleImage}
                    />
                </div>
                {uploadProgress != 0 &&
                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style={{width:`${uploadProgress}%`}}>
                        {uploadProgress<100 ?`Uploading ${uploadProgress}%`:`Uploaded ${uploadProgress}%`}</div>
                  </div>
                }

                {id && <img src={slider.image} width='50px' height='50px'/>}
                <div class="mb-3">
                    <label for="" class="form-label">description</label>
                    <textarea class="form-control" name="desc" id="" rows="3" value={slider.desc} onChange={(e)=>setSlider({...slider,desc:e.target.value})}>{slider.desc}</textarea>
                </div>
                <div class="form-group">               
                 <label>
                    <input
                        type="checkbox"
                        checked={isActive}
                        onChange={()=>setIsActive(!isActive)} 
                    />
                     {isActive ? 'Active' : 'Inactive'}
                  </label>
                     </div>
               <button
                type="submit"
                class="btn btn-primary mt-2"
               >
                {id ?"Update ":"Submit"}
               </button>
               
            </form>
        </div>
    )
}

export default AddSliderImage
