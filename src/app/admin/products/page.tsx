import React from 'react'
import ProductForm from "@/components/ProductForm";

export default function page() {
  return (
    <div className="space-y-8">
        <h1 className="text-2xl font-bold text-black">Product Management</h1>

        <ProductForm />
    </div>
  )
}
