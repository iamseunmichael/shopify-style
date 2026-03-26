import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {

  try {

    const auth = verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: auth.userId,
        status: "PENDING",
      },
      include: {
        items: true,
      },
    });

    if (!order || order.items.length === 0) {
      return NextResponse.json({ message: "Cart empty" }, { status: 400 });
    }

    // calculate total
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // update order status
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        total,
        status: "PAID",
      },
    });

    // reduce inventory
    await Promise.all(
      order.items.map(item =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              decrement: item.quantity,
            },
          },
        })
      )
    );

    return NextResponse.json(updatedOrder);

  } catch (error) {

    console.error("Checkout error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

  }

}