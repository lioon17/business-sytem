import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Prisma client

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare passwords WITHOUT hashing (plain text)
    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
