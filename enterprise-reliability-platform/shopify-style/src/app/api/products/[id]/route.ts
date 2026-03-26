import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { productSchema } from "@/schemas/product.schema"

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const validated = productSchema.parse(body)

    const product = await prisma.product.update({
      where: { id },
      data: validated
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Update failed" }, { status: 400 })
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  await prisma.product.delete({ where: { id } })

  return NextResponse.json({ success: true })
}