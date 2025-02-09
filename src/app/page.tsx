'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="mb-8 text-lg">Please log in to continue.</p>
      <button
        onClick={goToLogin}
        className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
}
