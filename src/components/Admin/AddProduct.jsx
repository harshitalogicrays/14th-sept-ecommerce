
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../customhook/useFetchCollection";
import { db, storage } from '../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { selectproducts } from "../../redux/productSlice";
const AddProduct = () => {
  const {id}=useParams()
  const productList=useSelector(selectproducts)
  const productEdit=productList.find((item)=>item.id==id)

  
  const {data}=useFetchCollection("categories")
  const [uploadProgress,setUploadProgress]=useState(0)
  const redirect=useNavigate()
  let obj = {category: "select", name: "",  price: "", brand: "", stock: "",image:"", description: ""};
  let [product, setProduct] = useState({...obj});
  let [newImages,setNewImages]=useState([])
  let [productImages,setProductImages]=useState([])
  useEffect(()=>{
    if(id){setProduct(productEdit)
        setProductImages(productEdit.image || [])
    }
    else {setProduct({...obj})}
  },[id])
 


 let handleproduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  let handleImage=(e)=>{
    let images=e.target.files
    let arr=[]
    Array.from(images).forEach((file)=>{
            const storageRef= ref(storage,`14thsept-product-images/${Date.now()}`)
           const uploadTask=uploadBytesResumable(storageRef,file)
           uploadTask.on("state_changed",(snapshot)=>{
                let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100
                setUploadProgress(progress)
           },(error)=>{toast.error(error.message)},
           ()=>{
               getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                   arr.push(url)
                    setNewImages((prevImages)=>[...prevImages,url])
               }) 
           }
           )
              })
              setProduct({...product,image:arr})

   }

   let handleRemoveImage=(index,image)=>{
      const updatedImages=[...productImages]
      updatedImages.splice(index,1)
      setProductImages(updatedImages)
      if(ref(storage,image)){
        deleteObject(ref(storage,image))
      }
    }

  let handlesubmit=async(e)=>{
    e.preventDefault()
    if(!id){
    try{
      const docRef=collection(db,"products")
      await addDoc(docRef,{...product,createdAt:Timestamp.now().toMillis()})
      toast.success("product added")
      redirect('/admin/viewproducts')
  }
    catch(err){toast.error(err.message)}
  }
  else {
      const updatedImages=[...productImages,...newImages]
      try{
        setDoc(doc(db,"products",id),{
          category:product.category,
          name:product.name,
          brand:product.brand,
          price:product.price,
          stock:product.stock,
          description:product.description,
          image:updatedImages,
          createdAt:productEdit.createdAt,
          editedAt:Timestamp.now().toMillis()
        })
        toast.success("product updated")
        redirect('/admin/viewproducts')
        }
        catch(err){
          toast.error(err.message)
        }
  }
}
  return (
    <div className="container mt-3 shadow">
      {/* {isLoading && <Loader/>} */}
      <h1>Add Product</h1> <hr />
      <form onSubmit={handlesubmit} encType="multipart/form-data">
        <div class="mb-3">
          <label for="" class="form-label">
            category
          </label>
          <select name="category" class="form-select" onChange={handleproduct} value={product.category}>
            <option value="select" disabled > ------choose one-----------</option>
            {data.map((cat)=><option key={cat.id}>{cat.title}</option>)}
          </select>
        </div>
        <div className="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            class="form-control"
            value={product.name}
            onChange={handleproduct}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            price
          </label>
          <input
            type="number"
            name="price"
            id=""
            class="form-control"
            value={product.price}
            onChange={handleproduct}
          />
        </div></div>
        <div className="row">
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            id=""
            class="form-control"
            value={product.brand}
            onChange={handleproduct}
          />
        </div>
        <div class="mb-3 col-6">
          <label for="" class="form-label">
            stock
          </label>
          <input
            type="number"
            name="stock"
            id=""
            class="form-control"
            value={product.stock}
            onChange={handleproduct}
          />
        </div> </div>
        {uploadProgress != 0 &&
                    <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style={{width:`${uploadProgress}%`}}>
                        {uploadProgress<100 ?`Uploading ${uploadProgress}%`:`Uploaded ${uploadProgress}%`}</div>
                  </div>
                }
        <div class="mb-3">
          <label for="" class="form-label">
            image
          </label>
          <input
            type="file"
            name="image"
            id="" multiple
            class="form-control"
             onChange={handleImage}
          />
        </div>
        {id && 
          <>
            {productImages.map((image,i)=>
            <React.Fragment key={i}>
              <img src={image} height='100px' width='100px' style={{border:'2px solid black'}}/>
              <span type="button" style={{position:'relative',top:'-45px',marginRight:'10px'}}
              onClick={()=>handleRemoveImage(i,image)}
              >X</span>
            </React.Fragment>
            )}
          </>
        } 
               <div class="mb-3">
          <label for="" class="form-label">
            description
          </label>
          <textarea name="description" class="form-control" value={product.description}   onChange={handleproduct}></textarea>
        </div>
        <button type="submit" class="btn btn-primary">submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
