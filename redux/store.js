import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/authSlice";
import productReducer from "./ProductSlice/productSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
});
