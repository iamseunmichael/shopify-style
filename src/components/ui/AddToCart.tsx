"use client";

import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      const data = await res.json();
      alert(`Added to cart! Total items: ${data.order.items.length}`);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}