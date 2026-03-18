import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {

    const { itemId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.orderItem.delete({
        where: { id: itemId },
      });

      return NextResponse.json({ message: "Item removed" });
    }

    const item = await prisma.orderItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json(item);

  } catch (error) {

    console.error("Cart update error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

  }
}