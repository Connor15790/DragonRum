import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Check Session (Load User on App Start)
export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
    try {
        const res = await axios.get("/api/auth/refreshlogin");
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

export const signup = createAsyncThunk("auth/signup", async ({ name, email, password }, thunkAPI) => {
    try {
        const res = await axios.post("/api/auth/signup",
            { name, email, password }
        );

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration failed"
        );
    }
})

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
    try {
        const res = await axios.post("/api/auth/login", { email, password });

        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loadingLogin: true,
        errorLogin: null,
        loadingSignup: true,
        errorSignup: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Load User Cases (Refresh persistence)
            .addCase(loadUser.pending, (state) => {
                state.loadingLogin = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loadingLogin = false;
                state.user = action.payload.user;
            })
            .addCase(loadUser.rejected, (state) => {
                state.loadingLogin = false;
                state.user = null;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loadingSignup = true;
                state.errorSignup = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loadingSignup = false;
                state.user = action.payload.user;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loadingSignup = false;
                state.errorSignup = action.payload;
            })

            // Login Cases
            .addCase(login.pending, (state) => {
                state.loadingLogin = true;
                state.errorLogin = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loadingLogin = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loadingLogin = false;
                state.errorLogin = action.payload;
            })
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;