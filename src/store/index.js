import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import cartReducer from "./cartSlice";


const store = configureStore({
    reducer:{
        cart:cartReducer.reducer,
        ui:uiReducer.reducer
    }
})

export default store