'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BookmarkList() {
    const [bookmarks, setBookmarks] = useState<any[]>([])
    const [userId, setUserId] = useState<string | null>(null)

    const fetchBookmarks = async () => {
        const { data } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

        setBookmarks(data || [])
    }

    useEffect(() => {
        const init = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return
        setUserId(user.id)

        fetchBookmarks()

        const channel = supabase
            .channel('bookmarks-user')
            .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'bookmarks',
                filter: `user_id=eq.${user.id}`,
            },
            () => {
                fetchBookmarks()
            }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
        }

        init()
    }, [])

    return (
        <ul className="space-y-2">
        {bookmarks.map((b) => (
            <li key={b.id} className="border p-2 flex justify-between">
            <a href={b.url} target="_blank" className="text-blue-600 underline">
                {b.title}
            </a>
            <button
                onClick={async () => {
                await supabase.from('bookmarks').delete().eq('id', b.id)
                }}
                className="text-red-600"
            >
                Delete
            </button>
            </li>
        ))}
        </ul>
    )
}
