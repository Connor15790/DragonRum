"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUser } from "@/redux/AuthSlice/authSlice"; // Adjust path if needed

// 1. Create a child component that has access to the store
const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // This fetches the user data from the /api/auth/me route
        // automatically when the app loads/refreshes
        dispatch(loadUser());
    }, [dispatch]);

    return children;
};

// 2. Wrap your app with Provider -> AuthLoader -> Children
export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthLoader>
                {children}
            </AuthLoader>
        </Provider>
    );
}