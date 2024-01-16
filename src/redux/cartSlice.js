import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :[],totalAmount:0,previousURL:''},
    reducers:{
       ADD_TO_CART(state,action){
        let itemindex=state.cartItems.findIndex(item=>item.id==action.payload.id)
        if(itemindex==-1){//add
            state.cartItems.push({...action.payload,cartQuantity:1})
            toast.success(`${action.payload.name} added to cart`)  }
        else {//increase
            if(state.cartItems[itemindex].cartQuantity < action.payload.stock)
            state.cartItems[itemindex].cartQuantity+=1
             else toast.info(`only ${action.payload.stock} available`)   }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
       },
       DECREASE(state,action){
        let itemindex=state.cartItems.findIndex(item=>item.id==action.payload.id)
        if(itemindex != -1){
            if(state.cartItems[itemindex].cartQuantity > 1)
            state.cartItems[itemindex].cartQuantity-=1}
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
       },
       REMOVE_FROM_CART(state,action){
        state.cartItems.splice(action.payload,1)
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
       },
       EMPTY_CART(state,action){
        state.cartItems=[];state.totalAmount=0
        localStorage.removeItem("cartItems")
       },
       CALCULATE_TOTAL(state,action){
        let cartTotal=state.cartItems.reduce((prev,item)=>{return prev+=(item.cartQuantity*item.price) },0)
        state.totalAmount=cartTotal
       },
       SAVE_URL(state,action){state.previousURL=action.payload}
    }
})
export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL, SAVE_URL}=cartSlice.actions
export default cartSlice.reducer
export const selectCartItems=state=>state.cart.cartItems
export const selectTotalAmount=state=>state.cart.totalAmount
export const selectURL=state=>state.cart.previousURL
