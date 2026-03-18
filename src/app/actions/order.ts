import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

// CREATE ORDER
export async function POST(req: NextRequest) {
  try {
    const auth = verifyAuth(req);

    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const items = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "No items provided" },
        { status: 400 }
      );
    }

    // fetch products to calculate price
    const productIds = items.map((i: any) => i.productId);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    // calculate total
    let total = 0;

    const orderItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      const price = product.price;

      total += price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
      };
    });

    // create order with items
    const order = await prisma.order.create({
      data: {
        userId: auth.userId,  
        total,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order);

  } catch (error) {
    console.error("Order creation error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}