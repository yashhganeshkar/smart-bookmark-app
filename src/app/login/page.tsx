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
        <div className="min-h-screen flex items-center justify-center">
        <button
            onClick={handleLogin}
            className="px-6 py-3 bg-black text-white rounded"
        >
            Sign in with Google
        </button>
        </div>
    )
}
