import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing data", { status: 400 });
    }
    const user = await prisma.user.create({
      data: { email, name, hashedPassword: password },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    return new NextResponse("Error creating user", { status: 500 });
  }
}
