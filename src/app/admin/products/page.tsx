"use client";

import React from "react";
import ProductForm from "@/components/ProductForm";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { swrConfig } from "@/lib/swr-config";

export default function Page() {
  const { data, error, isLoading } = useSWR(
    "/api/auth/admin_auth",
    fetcher,
    swrConfig
  );

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>
        <div className="absolute h-8 w-8 animate-pulse rounded-full bg-indigo-100"></div>
      </div>
    );
  }

  if (error) {
    if (error.message === "Forbidden") {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-3">
          <p className="text-sm text-red-700">Unauthorized Access</p>
        </div>
      );
    }

    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-3">
        <p className="text-sm text-red-700">Error loading dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-black">Product Management</h1>
      <ProductForm />
    </div>
  );
}