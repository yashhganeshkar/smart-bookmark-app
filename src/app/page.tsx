'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        Smart Bookmark App 🚀
      </h1>

      <button
        onClick={() => router.push('/login')}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Go to Login
      </button>
    </main>
  )
}
