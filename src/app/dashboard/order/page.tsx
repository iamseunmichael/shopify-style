"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchOrders() {

      try {

        const res = await fetch("/api/orders")

        const data = await res.json()

        setOrders(data)

      } catch (error) {

        console.error(error)

      } finally {
        setLoading(false)
      }

    }

    fetchOrders()

  }, [])

  if (loading) {
    return <p className="p-6 text-black">Loading orders...</p>
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6 text-black">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-black">No orders yet</p>
      ) : (

        <div className="space-y-4">

          {orders.map((order: any) => (

            <div
              key={order.id}
              className="bg-white shadow rounded-xl p-6"
            >

              <div className="flex justify-between mb-4">

                <div>
                  <p className="font-semibold text-black">
                    Order #{order.id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className={`p-3 rounded-full text-sm w-fit ${order.status == "PAID" ? "bg-green-500": "bg-red-500"}`}>
                   <span className="text-sm ">{order.status}</span>
                </div>
              </div>

              <div className="space-y-2">

                {order.items.map((item: any) => (

                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >

                    <span className="text-black">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="text-black">
                      ${item.price}
                    </span>

                  </div>

                ))}

              </div>

              <div className="mt-4 font-bold text-right text-black">
                Total: ${order.total}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}