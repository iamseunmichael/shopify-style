"use client";

import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";

const getKey = (pageIndex: number) => `/api/activity?page=${pageIndex}`
interface Activity {
  id: string | number;
  description: string;
}

export default function RecentActivity() {
    const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

    if(!data) return <div>Loading Activity...</div>

    const activities = data.flat()

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
                {activities.map((item: Activity) => (
                    <li key={item.id} className="text-sm">
                        {item.description}
                    </li>
                ))}
            </ul>

            <button onClick={() => setSize(size + 1)} className="mt-4 text-blue-600">Load more</button>
        </div>
    )
}