"use client"

import { useEffect, useState } from "react"

export default function MonitoringPage() {

  const [metrics, setMetrics] = useState<any>(null)

  async function fetchMetrics() {
    const res = await fetch("/api/monitoring")
    const data = await res.json()
    setMetrics(data)
  }

  useEffect(() => {

    fetchMetrics()

    const interval = setInterval(fetchMetrics, 3000)

    return () => clearInterval(interval)

  }, [])

  if (!metrics) return <p className="text-2xl font-bold text-black">Loading...</p>

  return (
    <div className="p-10 text-black">

      <h1 className="text-2xl font-bold text-black">
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