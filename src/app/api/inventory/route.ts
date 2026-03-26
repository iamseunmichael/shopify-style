import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";


// GET INVENTORY
export async function GET(req: NextRequest) {
  try {
    const auth = verifyAuth(req);

    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (auth.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        inventory: true,
        price: true,
      },
      orderBy: {
        inventory: "asc",
      },
    });

    return NextResponse.json(products);

  } catch (error) {
    console.error("Inventory fetch error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


// UPDATE INVENTORY
export async function PATCH(req: NextRequest) {
  try {
    const auth = verifyAuth(req);

    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (auth.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: body.productId,
      },
      data: {
        inventory: body.inventory,
      },
    });

    return NextResponse.json(product);

  } catch (error) {
    console.error("Inventory update error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}