import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

// Define types for your request body
interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface Product {
  id: string;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);

    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json() as { items: OrderItemRequest[] };
    const items = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "No items provided" },
        { status: 400 }
      );
    }

    const productIds = items.map((i) => i.productId);

    const products: Product[] = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    let total = 0;

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const price = product.price;
      total += price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
      };
    });

    const order = await prisma.order.create({
      data: {
        userId: auth.userId,
        total,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
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