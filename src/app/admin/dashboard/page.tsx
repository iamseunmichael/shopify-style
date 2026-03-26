"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher";
import { swrConfig } from "@/lib/swr-config";
import MetricCard from "@/components/dashboard/MetricCard";
import LowInventoryAlert from "@/components/dashboard/LowInventoryAlert";
import ProductTable from "@/components/dashboard/ProductTable";

export default function DashboardPage() {
    const { data, error, isLoading } = useSWR("/api/dashboard/metrics", fetcher, swrConfig)
    const { data: lowInventory } = useSWR("/api/dashboard/lowInventoryAlert", fetcher, swrConfig)

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
   
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-blue-200">Dashboard Overview</h1>

            {/* Metric */}
            <div className="grid grid-cols-4 gap-6">
                <MetricCard title="Revenue" value={`$${data.revenue}`} />
                <MetricCard title="Orders" value={`$${data.orders}`} />
                <MetricCard title="Customers" value={`$${data.customers}`} />
                <MetricCard title="Low Inventory" value={`$${data.lowInventoryCount}`} />
            </div>

            {/* Alert */}
            {lowInventory && <LowInventoryAlert items={lowInventory.products} />}

            {/* Product Table */}
            <ProductTable /> 
            
        </div>
    )
}