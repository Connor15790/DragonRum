import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request) {
    const token = request.headers.get("auth-token");

    if (!token) {
        return NextResponse.json(
            { error: "Please authenticate using a valid token!" },
            { status: 401 }
        );
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return NextResponse.json(
            { error: "Invalid or expired token" },
            { status: 401 }
        );
    }
}
