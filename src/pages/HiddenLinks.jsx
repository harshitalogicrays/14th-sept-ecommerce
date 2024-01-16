import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUserRole } from "../redux/authSlice"
import { Navigate } from "react-router-dom"

export const ShowOnLogin=({children})=>{
    let isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn){return children}
    else return null
}

export const ShowOnLogout=({children})=>{
    let isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn==false){return children}
    else return null
}
//admin protected routes
export const ProtectedAdmin=({children})=>{
    let isLoggedIn=useSelector(selectIsLoggedIn)
    let role=useSelector(selectUserRole)
    if(isLoggedIn && role=='admin')return children
    else return <Navigate to='/login' replace={true}></Navigate>
}
//user protected routes 
export const Protected=({children})=>{
    let isLoggedIn=useSelector(selectIsLoggedIn)
    if(isLoggedIn)return children
    else return <Navigate to='/login' replace={true}></Navigate>
}