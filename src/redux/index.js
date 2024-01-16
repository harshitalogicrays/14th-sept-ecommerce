import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categoriesSlice from "./categoriesSlice";
import sliderSlice from "./sliderSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice.";
import orderSlice from "./orderSlice";
import filterSlice from "./filterSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        category:categoriesSlice,
        slider:sliderSlice,
        product:productSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        order:orderSlice,
        filter:filterSlice
    }
})
export default store