import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("product/fetchCart", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/cart");

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Fetching products failed!"
        );
    }
})

export const addtoCart = createAsyncThunk("product/addtoCart", async (productData, thunkAPI) => {
    try {
        const response = await axios.post("/api/cart", productData);

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Fetching products failed!"
        );
    }
})

export const updateCart = createAsyncThunk("product/updateCart", async ({ productId, quantity }, thunkAPI) => {
    try {
        const response = await axios.put("/api/cart", { productId, quantity });

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Updating product failed!"
        );
    }
})

export const clearCart = createAsyncThunk("product/clearCart", async (_, thunkAPI) => {
    try {
        const response = await axios.delete("/api/cart");

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Clearing cart failed!"
        );
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalPrice: 0,
        isCartOpen: false,
        // Fetch States
        cartLoadingFetch: true,
        cartErrorFetch: null,

        // Add States
        cartLoadingAdd: false,
        cartErrorAdd: null,

        // Update/Remove States
        cartLoadingUpdate: false,
        cartErrorUpdate: null,

        // Clear States
        cartLoadingClear: false,
        cartErrorClear: null,
    },
    reducers: {
        setCartOpen: (state, action) => {
            state.isCartOpen = action.payload;
        },
        clearCartLocal: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.cartLoadingFetch = true;
                state.cartErrorFetch = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartLoadingFetch = false;
                state.items = action.payload.items || [];
                state.totalPrice = action.payload.totalPrice || 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.cartLoadingFetch = false;
                state.cartErrorFetch = action.payload
            })

            // Add to cart
            .addCase(addtoCart.pending, (state) => {
                state.cartLoadingAdd = true;
                state.cartErrorAdd = null;
            })
            .addCase(addtoCart.fulfilled, (state, action) => {
                state.cartLoadingAdd = false;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(addtoCart.rejected, (state, action) => {
                state.cartLoadingAdd = false;
                state.cartErrorAdd = action.payload;
            })

            // Update cart items
            .addCase(updateCart.pending, (state) => {
                state.cartLoadingUpdate = true;
                state.cartErrorUpdate = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.cartLoadingUpdate = false;
                state.items = action.payload.items;
                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.cartLoadingUpdate = false;
                state.cartErrorUpdate = action.payload;
            })

            // Clear cart
            .addCase(clearCart.pending, (state) => {
                state.cartLoadingClear = true;
                state.cartErrorClear = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartLoadingClear = false;
                state.items = [];
                state.totalPrice = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.cartLoadingClear = false;
                state.cartErrorClear = action.payload;
            })
    }
})

export const { setCartOpen, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;