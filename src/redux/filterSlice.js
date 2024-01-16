import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
    initialState:{filterProducts:[]},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {products,search}=action.payload
            if(search !=null){
            state.filterProducts=products.filter((item)=>item.name.includes(search))
            }
        }
    }
})
export const {FILTER_BY_SEARCH} = filterSlice.actions
export default filterSlice.reducer
export const selectfilters=(state)=>state.filter.filterProducts