import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return NextResponse.json(
            {
                message: "Login Successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error: ", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}