import { NextResponse } from "next/server"
import { getMetrics } from "@/lib/monitoring/metrics"

export async function GET() {

  const metrics = getMetrics()

  return NextResponse.json(metrics)
}