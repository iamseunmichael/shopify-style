"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher";
import { swrConfig } from "@/lib/swr-config";

type MonitoringMetrics = {
  totalRequests: number
  totalErrors: number
  avgLatency: number
}

export default function MonitoringPage() {

  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null)
  const {data, error, isLoading} = useSWR("/api/auth/admin_auth", fetcher, swrConfig)

  if(isLoading) {
        return (
            <div className="relative flex items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
                <div className="absolute h-8 w-8 animate-pulse rounded-full bg-indigo-100"></div>
            </div>
        );
  }

  if(error) { 
        if(error.message === "Forbidden") return <div className="bg-red-50 border-l-4 border-red-500 p-3"><p className="text-sm text-red-700">Unauthorized Access</p></div>
      return (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
                <p className="text-sm text-red-700">Error loading dashboard</p>
            </div>
      ); 
    } 

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