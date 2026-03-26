import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = verifyAuth(req);
    if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { productId, quantity } = await req.json();

    if (!productId || !quantity) {
      return NextResponse.json({ message: "Product ID and quantity required" }, { status: 400 });
    }

    // Check product exists and has enough inventory
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
    if (product.inventory < quantity) return NextResponse.json({ message: "Not enough stock" }, { status: 400 });

    // Check if user already has a PENDING order (cart)
    let order = await prisma.order.findFirst({
      where: { userId: auth.userId, status: "PENDING" },
      include: { items: true },
    });

    if (!order) {
      // create new PENDING order
      order = await prisma.order.create({
        data: { userId: auth.userId, total: 0 },
        include: { items: true },
      });
    }

    // Check if item already exists in the order
    const existingItem = order.items.find(item => item.productId === productId);
    if (existingItem) {
      // update quantity and price
      await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          price: product.price,
        },
      });
    }

    // recalculate total
    const updatedOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: { items: true },
    });

    const total = updatedOrder!.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await prisma.order.update({ where: { id: order.id }, data: { total } });

    return NextResponse.json({ message: "Added to cart", order: updatedOrder });
  } catch (err) {
    console.error("Add to cart error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}