import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {

    const auth = verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { itemId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.orderItem.delete({
        where: { id: itemId }
      });

      return NextResponse.json({ message: "Item removed" });
    }

    const updatedItem = await prisma.orderItem.update({
      where: { id: itemId },
      data: {
        quantity
      }
    });

    return NextResponse.json(updatedItem);

  } catch (error) {

    console.error("Update cart error:", error);

    return NextResponse.json(
      { message: "Failed to update cart" },
      { status: 500 }
    );
  }
}