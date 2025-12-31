import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbConnect();

        const { name, email, password } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                {
                    message: "Email already exists!"
                },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json(
            {
                message: "Success",
                user: { name: user.name, email: user.email, _id: user._id }
            },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Registration error: ", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}