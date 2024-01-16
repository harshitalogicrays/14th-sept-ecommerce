import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import './ImageThumbnail.css'
const ImageThumbnail = ({imgs}) => {
    console.log(imgs)
    let [index,setIndex]=useState(0)
    let [image,setImage]=useState(imgs[0])
    let handleClick=(index)=>{
        setIndex(index)
        setImage(imgs[index])
    }
  return (
    <div className='main'>
    <ReactImageMagnify {...{
        smallImage: {
            alt: 'loading',
            width:500,
            height:300,
            src:image
        },
        largeImage: {
            src:image,
            width: 1200,
            height: 1800
        }
    }} />
       <div className='flex_row'>
        {imgs.map((data,i)=>
        <div className="thumbnail" key={i} >
          <img className={index==i ? "clicked":''} src={data} onClick={()=>handleClick(i)} height="70" width="100" />
        </div>
        )}
      </div>
    </div>
  )
}

export default ImageThumbnail
