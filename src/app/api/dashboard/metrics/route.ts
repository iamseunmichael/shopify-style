import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/auth";


export async function GET(req: NextRequest) {
    try {
        //Authentication
        const auth = verifyAuth(req)
        if(!auth) {
            return NextResponse.json(
                {message: "Unathorized"},
                {status: 401}
            )
        }

        //Role Authentification
        if(auth.role !== "ADMIN") {
            return NextResponse.json(
                {message: "Forbidden"},
                {status: 403}
            )
        }

        //Aggregations (Parallelized for performance)
        const [
            revenueAggregate,
            orderCount,
            customerCount,
            lowInventoryProducts,
        ] = await Promise.all([
            prisma.order.aggregate({
                _sum: {total: true},
                where: {status: "PAID"},
            }),

            prisma.order.count(),

            prisma.user.count({
                where: {role: "CUSTOMER"},
            }),

            prisma.product.findMany({
                where: {
                    inventory: {lt: 5},
                    isActive: true,
                },
                select: {
                    id: true,
                    name: true,
                    inventory: true,
                },
            }),
        ])

        return NextResponse.json({
            revenue: revenueAggregate._sum.total || 0,
            orders: orderCount,
            customers: customerCount,
            lowInventoryCount: lowInventoryProducts.length,
            lowInventory: lowInventoryProducts,
        })
    } catch (error) {
        console.error("Dashboard metrics error: ", error) 

        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}   
