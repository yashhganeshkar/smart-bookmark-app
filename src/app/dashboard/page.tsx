'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'

export default function DashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        const checkUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            router.replace('/login')
        } else {
            setEmail(user.email ?? '')
            setLoading(false)
        }
        }

        checkUser()
    }, [router])

    if (loading) {
        return <p className="p-8">Loading...</p>
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.replace('/login')
    }


    return (
        <div className="p-8">
        <h2 className="text-xl font-semibold mb-1">Dashboard</h2>
        <p className="text-sm text-gray-600 mb-6">
            Logged in as: {email}
        </p>
        <button
            onClick={handleLogout}
            className="mb-6 px-4 py-2 bg-red-500 text-white rounded"
            >
            Logout
        </button>

        <AddBookmark />
        <BookmarkList />
        </div>
    )
}
