import React from 'react'

export default function Skeleton() {
  return (
    <div className="animate-pulse w-full border border-gray-100 rounded-xl p-4 bg-gray-400">
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        
        <div className="flex-1 space-y-3">
          {/* Name Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {/* Price/Stock Placeholder */}
          <div className="flex gap-4">
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
          </div>
        </div>
        
        {/* Action Button Placeholder */}
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        
        <div className="flex-1 space-y-3">
          {/* Name Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {/* Price/Stock Placeholder */}
          <div className="flex gap-4">
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
          </div>
        </div>
        
        {/* Action Button Placeholder */}
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        
        <div className="flex-1 space-y-3">
          {/* Name Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {/* Price/Stock Placeholder */}
          <div className="flex gap-4">
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
          </div>
        </div>
        
        {/* Action Button Placeholder */}
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex items-center gap-4">
        {/* Thumbnail Placeholder */}
        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
        
        <div className="flex-1 space-y-3">
          {/* Name Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {/* Price/Stock Placeholder */}
          <div className="flex gap-4">
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            <div className="h-3 bg-gray-100 rounded w-1/6"></div>
          </div>
        </div>
        
        {/* Action Button Placeholder */}
        <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}