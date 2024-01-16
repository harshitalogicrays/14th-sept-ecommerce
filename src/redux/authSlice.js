import { createSlice } from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:false,userName:null,userEmail:null,userRole:null,userId:null},
    reducers:{
        loginuser(state,action){
            console.log(action.payload)
            let{userName,userEmail,userRole,userId}=action.payload
            state.isLoggedIn=true
            state.userName=userName
            state.userEmail=userEmail
            state.userRole=userRole
            state.userId=userId
        },
        logoutuser(state,action){
            state.isLoggedIn=false
            state.userName=null
            state.userEmail=null
            state.userRole=null
            state.userId=null
        }
    }
})
export const {loginuser,logoutuser}=authSlice.actions
export default authSlice.reducer
export const selectIsLoggedIn=(state)=>state.auth.isLoggedIn
export const selectUserName=(state)=>state.auth.userName
export const selectUserEmail=(state)=>state.auth.userEmail
export const selectUserId=(state)=>state.auth.userId
export const selectUserRole=(state)=>state.auth.userRole