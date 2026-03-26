
"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueChartProps {
  data: { date: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value) => `$${Number(value ?? 0).toLocaleString()}`} />
        <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}