"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import ProductCard from "./ProductCard";
import LoadingProduct from "../components/LoadingProducts"

export default function ProductGrid() {

  const { data, error, isLoading } = useSWR("./api/products", fetcher)

  if (isLoading) return <LoadingProduct />
  if (error) return <div className="p-6 text-red-600">Error loading products</div>

  return (
    <div className="grid grid-cols-4 gap-6">

      {data.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  );
}