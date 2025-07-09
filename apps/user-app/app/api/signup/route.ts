import { client } from "@repo/db/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



export const POST = async (req: Request) => {
    const body = await req.json();
    const {username, password} = body;

    if(!username || !password){
        return NextResponse.json("Missing username or password", {status: 400});
    }

    const existingUser = await client.user.findUnique({
        where: { username },
    });

    if(existingUser){
        return NextResponse.json("User already exists", {status: 400});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
        data: {
            username,
            password: hashPassword,
        },
    });
    return NextResponse.json({ message: "User created", user: { username: user.username } });
}