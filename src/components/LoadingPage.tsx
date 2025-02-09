'use client';
import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <p className="mt-4 text-xl font-medium text-gray-700">Loading...</p>
    </div>
  );
}
