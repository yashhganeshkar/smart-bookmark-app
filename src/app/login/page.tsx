'use client'

import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
        })
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
        {/* App Title */}
        <h1 className="text-3xl font-bold">
            Smart Bookmark App 🚀
        </h1>

        {/* Login Button */}
        <button
            onClick={handleLogin}
            className="px-6 py-3 bg-black text-white rounded"
        >
            Sign in with Google
        </button>
        </main>
    )
}
