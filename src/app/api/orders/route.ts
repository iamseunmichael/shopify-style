import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {

    const auth = verifyAuth(req)

    if (!auth) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: auth.userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(orders)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    )

  }
}