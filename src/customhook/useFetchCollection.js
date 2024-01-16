import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'

const useFetchCollection = (collectionname) => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        getCollection()
    },[])
    let getCollection=()=>{
        setIsLoading(true)
        try{
        const docRef=collection(db,collectionname)
        const q=query(docRef,orderBy('createdAt','desc'))
        onSnapshot(q,(snapshot)=>{
           const allData=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
           setData(allData)
           setIsLoading(false )
        })
    }
    catch(err){setIsLoading(false);toast.error(err.message)}
    }
  return ({data,isLoading})
}

export default useFetchCollection
