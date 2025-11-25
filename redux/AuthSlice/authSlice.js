import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/signup",
            { formData }
        );

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration failed"
        );
    }
})

export const login = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:3000/api/auth/login",
            { formData }
        );

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration failed"
        );
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null,
        token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;