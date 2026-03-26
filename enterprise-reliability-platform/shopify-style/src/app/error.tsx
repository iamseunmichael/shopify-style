'use client';

import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-10 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle size={40} />
      </div>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Something went wrong
      </h1>
      
      <p className="mb-8 max-w-md text-slate-500">
        An unexpected error occurred while loading this page. Our team has been notified and we're looking into it.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95"
        >
          <RefreshCcw size={16} />
          Try again
        </button>

        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
        >
          <Home size={16} />
          Return home
        </a>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs font-mono text-slate-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
