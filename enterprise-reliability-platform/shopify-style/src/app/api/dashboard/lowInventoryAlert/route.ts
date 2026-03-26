import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Authentication
    const auth = verifyAuth(req);

    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Role Authorization
    if (auth.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      );
    }

    // Low inventory check
    const lowInventoryProducts = await prisma.product.findMany({
      where: {
        inventory: {
          lt: 5, 
        },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        sku: true,
        inventory: true,
      },
      orderBy: {
        inventory: "asc",
      },
    });

    return NextResponse.json({
      count: lowInventoryProducts.length,
      products: lowInventoryProducts,
    });

  } catch (error) {
    console.error("Low inventory error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
