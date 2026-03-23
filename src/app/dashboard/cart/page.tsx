"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    const res = await fetch("/api/cart");
    const data: Cart = await res.json();
    setCart(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQty = async (itemId: string, qty: number) => {
    await fetch("/api/cart/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity: qty }),
    });
    loadCart();
  };

  const checkout = async () => {
    const res = await fetch("/api/cart/checkout", { method: "POST" });
    if (res.ok) {
      alert("Order placed!");
      loadCart();
    }
  };

  if (loading) return <p className="p-6 text-black">Loading cart...</p>;
  if (!cart?.items?.length)
    return (
      <div className="p-10 text-xl bg-black rounded-md">Cart is empty</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-10 text-white bg-black rounded-md">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-6 border-b pb-4"
        >
          <div>
            <h2 className="font-semibold">{item.product.name}</h2>
            <p>${item.price}</p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => updateQty(item.id, item.quantity - 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              +
            </button>
          </div>

          <p>${item.price * item.quantity}</p>
        </div>
      ))}

      <div className="flex justify-between mt-8 text-xl font-bold">
        <span>Total</span>
        <span>${cart.total}</span>
      </div>

      <button
        onClick={checkout}
        className="mt-8 w-full bg-green-600 py-3 rounded-lg"
      >
        Checkout
      </button>
    </div>
  );
}