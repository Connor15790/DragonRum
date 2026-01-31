import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async ({ category }, thunkAPI) => {
    try {
        let response;

        if (category) {
            response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-products?category=${category}`);
        } else {
            response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/get-products`);
        }

        return response.data.products;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Fetching products failed"
        );
    }
})

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        fetchProductsLoading: "idle",
        fetchProductsError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.fetchProductsLoading = "pending";
                state.fetchProductsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.fetchProductsLoading = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.fetchProductsLoading = "failed";
                state.fetchProductsError = action.payload;
            })
    }
})

export default productSlice.reducer;