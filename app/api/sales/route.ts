import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure this imports your Prisma client

// ✅ Fetch All Sales
export async function GET() {
  try {
    const sales = await prisma.sales.findMany({
      orderBy: { date: "desc" },
    });

    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    console.error("Error fetching sales:", error); // ✅ USE the error
    return NextResponse.json({ error: "Failed to fetch sales" }, { status: 500 });
  }
}

// ✅ Add a New Sale
export async function POST(req: Request) {
  try {
    const { date, productId, productName, quantity, price } = await req.json();

    if (!date || !productId || !productName || !quantity || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const total = quantity * price; // Calculate total

    const newSale = await prisma.sales.create({
      data: {
        date: new Date(date), // Convert to Date type
        productId,
        productName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        total,
      },
    });

    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    console.error("Error adding sale:", error); // ✅ USE the error
    return NextResponse.json({ error: "Failed to add sale" }, { status: 500 });
  }
}
