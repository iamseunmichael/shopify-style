"use client";

import { useMetrics } from "@/lib/hooks/useMetrics";
/*
interface Metrics {
  users: number;
  orders: number;
  revenue: number;
  growth: number;
}
 */
interface MetricProps {
  title: string;
  value: string | number;
}

export default function DashboardMetrics() {
  const { metrics, isLoading } = useMetrics();

  if (isLoading) return <p className="text-black">Loading metrics...</p>;

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <Metric title="Users" value={metrics.users} />
      <Metric title="Orders" value={metrics.orders} />
      <Metric title="Revenue" value={`$${metrics.revenue}`} />
      <Metric title="Growth" value={`${metrics.growth}%`} />
    </div>
  );
}

function Metric({ title, value }: MetricProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}