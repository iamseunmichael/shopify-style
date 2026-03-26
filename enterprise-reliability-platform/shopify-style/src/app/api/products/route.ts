/*

This handles:
GET /api/products
POST /api/products

*/

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/schemas/product.schema";

export async function GET () {
    try{
        const products = await prisma.product.findMany({
            take: 20,
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(products)
    }catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "Failed to fetch products" },
            {status: 500}
        )
    }
}

export async function POST(req: NextRequest) {
    try{
        const body = await req.json()

        const validated = productSchema.parse(body)

        const product = await prisma.product.create({
            data: validated,
        })

        return NextResponse.json(product, {status: 201})
    }catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "Invalid product data"},
            {status: 400}
        )
    }
}  
