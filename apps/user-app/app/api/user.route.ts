import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
    if(session?.user){
    return NextResponse.json(session.user);
  }
    return NextResponse.json({
        message: "You are not signed in",
    },{
        status: 403,
    });
};
