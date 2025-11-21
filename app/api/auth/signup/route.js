import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { name, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return NextResponse.json(
            { message: "User created", token, user: { name: user.name, email: user.email, _id: user._id } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error: ", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}