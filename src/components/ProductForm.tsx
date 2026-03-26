"use client"

import { useState } from "react";
import { createProduct } from "@/app/actions/product";

export default function ProductForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(formData: FormData){
        setLoading(true);
        const result = await createProduct(formData)

        if(result.success) {
            setMessage("Product created successfully"); 
        }else{
            setMessage(result.message || "Product not created")
        }
        setLoading(false)
    }

    return(
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
                <p className="text-sm text-gray-500">Fill in the details to list a new item in your inventory.</p>
            </div>

            <form action={handleSubmit} className="p-8 space-y-6">
                
                 {message && (
                    <div className={` p-3 rounded-lg text-sm flex items-center gap-2 ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {message}
                    </div>
                )}

                {/* Product Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Product Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <input
                            name="name"
                            placeholder="e.g. Wireless Noise Cancelling Headphones"
                            className="w-full pl-11 pr-4 py-2.5  bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-gray-900"
                            required
                        />
                    </div>
                </div>

                {/* Price & Inventory Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 ml-1">Price</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <span className="text-sm font-semibold">$</span>
                            </div>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full placeholder-gray text-gray-900 pl-8 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 ml-1">Inventory Stock</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            </div>
                            <input
                                name="inventory"
                                type="number"
                                placeholder="0"
                                min="0"
                                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none placeholder-gray text-gray-900"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Product URL */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Product URL</label>
                    <input
                        name="productURL"
                        placeholder="Product URL"
                        className="w-full pl-3 pr-4 py-2.5  bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-gray-900"
                    />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 ml-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Briefly describe the product's key features..."
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none placeholder-gray text-gray-900"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button 
                        type="button"
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                    >
                        {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Saving...
                        </>
                        ) : "Create Product"}
                    </button>
                </div>

            </form>
        </div>
    )
}