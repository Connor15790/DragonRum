import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("product/fetchCart", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/cart");

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Fetching products failed"
        );
    }
})

export const addtoCart = createAsyncThunk("product/addtoCart", async (productData, thunkAPI) => {
    try {
        const response = await axios.post("/api/cart", productData);

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Fetching products failed"
        );
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
        cartLoading: false,
        cartError: null
    },
    reducers: {
        clearCartLocal: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.items = action.payload.items || [];
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.payload
            })

            // Add to cart
            .addCase(addtoCart.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(addtoCart.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(addtoCart.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.payload;
            })
    }
})

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;