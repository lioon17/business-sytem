import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Ensure this imports your Prisma client

// 🟢 Fetch all inventory items
export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany(); 

    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}

// 🟢 Add a new product to inventory
export async function POST(req: Request) {
  try {
    const { name, category, price, stock, supplier, status } = await req.json();

    if (!name || !price || !stock || !supplier) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newItem = await prisma.inventory.create({
      data: {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        supplier,
        status,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}

// 🔴 Delete an item from inventory
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.inventory.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}



// 🟢 Update existing product
export async function PUT(req: Request) {
  try {
    const { id, name, category, price, stock, supplier, status } = await req.json();

    if (!id || !name || !category || !price || !stock || !supplier || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedProduct = await prisma.inventory.update({
      where: { id },
      data: {
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        supplier,
        status,
        lastUpdated: new Date(),
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}