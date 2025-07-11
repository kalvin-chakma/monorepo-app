import { client } from "@repo/db/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Missing email, username, or password" },
{ status: 400 }
      );
    }

    const existingUser = await client.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await client.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created",
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
};