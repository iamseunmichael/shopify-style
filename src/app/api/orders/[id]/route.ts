import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: { include: { product: true } }
      }
    })

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = verifyAuth(req)
    if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { id } = await context.params
    const body = await req.json()
    const { status } = body

    const order = await prisma.order.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = verifyAuth(req)
    if (!auth) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { id } = await context.params

    await prisma.order.delete({ where: { id } })

    return NextResponse.json({ message: "Order deleted" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to delete order" }, { status: 500 })
  }
}