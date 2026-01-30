import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json(
            { message: "Login Successful", user: { id: user._id, name: user.name, email: user.email } },
            { status: 200 }
        );

        // Cookie
        response.cookies.set("token", token, {
            httpOnly: true, // Prevents client-side JS from reading the cookie (security)
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in prod
            sameSite: "lax", // Protection against CSRF
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error: ", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}