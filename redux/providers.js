"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUser } from "@/redux/AuthSlice/authSlice";
import { fetchCart } from "./CartSlice/cartSlice";

// Create a child component that has access to the store
const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        // This fetches the user data from the /api/auth/me route
        // automatically when the app loads/refreshes
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        // Fetch cart if the user is loaded
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user])

    return children;
};

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthLoader>
                {children}
            </AuthLoader>
        </Provider>
    );
}