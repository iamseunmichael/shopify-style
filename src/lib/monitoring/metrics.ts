type Metrics = {
  totalRequests: number
  totalErrors: number
  apiLatency: number[]
}

export const metrics: Metrics = {
  totalRequests: 0,
  totalErrors: 0,
  apiLatency: []
}

export function recordRequest(latency: number) {
  metrics.totalRequests++
  metrics.apiLatency.push(latency)

  if (metrics.apiLatency.length > 50) {
    metrics.apiLatency.shift()
  }
}

export function recordError() {
  metrics.totalErrors++
}

export function getMetrics() {
  const avgLatency =
    metrics.apiLatency.reduce((a, b) => a + b, 0) /
      (metrics.apiLatency.length || 1)

  return {
    totalRequests: metrics.totalRequests,
    totalErrors: metrics.totalErrors,
    avgLatency: Math.round(avgLatency)
  }
}