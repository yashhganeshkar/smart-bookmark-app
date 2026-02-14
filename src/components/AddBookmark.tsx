'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddBookmark() {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const {
        data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        await supabase.from('bookmarks').insert({
        title,
        url,
        user_id: user.id,
        })

        // ✅ TEMPORARY FALLBACK (safe for challenge)
        window.location.reload()
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
            className="border p-2 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />

        <input
            className="border p-2 w-full"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
        />

        <button
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
        >
            Add Bookmark
        </button>
        </form>
    )
}
