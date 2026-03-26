export default function LoginSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        
        {/* Title */}
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200 mb-6"></div>

        {/* Email */}
        <div className="mb-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 mb-2"></div>
          <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 mb-2"></div>
          <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Button */}
        <div className="h-10 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
}