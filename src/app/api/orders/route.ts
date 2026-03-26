import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { log } from "@/lib/debug/logger"
import { recordRequest, recordError } from "@/lib/monitoring/metrics"

export async function GET(req: NextRequest) {

  const start = Date.now();
  log("INFO", "Fetching orders")

  try {

    const auth = verifyAuth(req)

    if (!auth) {
      recordError();
      log("WARN", "Unauthorized order fetch attempt")

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

    log("DEBUG", "Orders fetched successfully", {
      count: orders.length
    })
    const latency = Date.now() - start;
    recordRequest(latency)

    return NextResponse.json(orders)

  } catch (error) {

    recordError()
    log("ERROR", "Failed to fetch orders", { error })

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    )

  }
}