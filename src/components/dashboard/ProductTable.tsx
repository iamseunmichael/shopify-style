"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"

interface Product {
  id: string
  name: string
  price: number
  inventory: number
  sku: string
}

export default function ProductTable() {
  const { data, error, isLoading } = useSWR("/api/products", fetcher)

  if (isLoading) return <div className="p-6">Loading products...</div>
  if (error) return <div className="p-6 text-red-600">Error loading products</div>

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="font-semibold text-lg text-black">Products</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Inventory</th>
              <th className="text-right px-6 py-3">SKU</th>
            </tr>
          </thead>

          <tbody>
            {data.map((product: Product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Product Name */}
                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.name}
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-gray-600">
                  ${product.price.toLocaleString()}
                </td>

                {/* Inventory */}
                <td className="px-6 py-4">
                  {product.inventory < 5 ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                      Low ({product.inventory})
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      {product.inventory} in stock
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right space-x-3">
                  <span className="px-2 py-1 text-xs text-gray-800 font-medium">
                    {product.sku} 
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-500 border-t">
        Showing {data.length} products
      </div>
    </div>
  )
}