"use client"

import { useEffect, useState } from "react"

type MonitoringMetrics = {
  totalRequests: number
  totalErrors: number
  avgLatency: number
}

export default function MonitoringPage() {

  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null)

  useEffect(() => {

    async function loadMetrics() {
      const res = await fetch("/api/monitoring")
      const data: MonitoringMetrics = await res.json()
      setMetrics(data)
    }

    loadMetrics()

    const interval = setInterval(loadMetrics, 3000)

    return () => clearInterval(interval)

  }, [])

  if (!metrics) return <p className="text-2xl font-bold text-black">Loading...</p>

  return (
    <div className="p-10 text-black">

      <h1 className="text-2xl font-bold">
        Enterprise Monitoring
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6">

        <div className="border p-4 rounded">
          Total Requests
          <p className="text-xl">{metrics.totalRequests}</p>
        </div>

        <div className="border p-4 rounded">
          Error Count
          <p className="text-xl">{metrics.totalErrors}</p>
        </div>

        <div className="border p-4 rounded">
          Avg API Latency
          <p className="text-xl">{metrics.avgLatency} ms</p>
        </div>

      </div>

    </div>
  )
}