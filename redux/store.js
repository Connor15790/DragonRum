import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/authSlice";
import productReducer from "./ProductSlice/productSlice";
import cartReducer from "./CartSlice/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer
    }
});
