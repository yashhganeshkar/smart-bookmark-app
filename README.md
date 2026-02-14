# Smart Bookmark App

A full-stack web application built using Next.js App Router and Supabase that allows users to save, view, and manage personal bookmarks securely.

## Tech Stack
- Next.js (App Router)
- Supabase (Auth, Database, RLS)
- Tailwind CSS
- Vercel

## Features
- Google Authentication
- Private user-specific bookmarks
- Add and delete bookmarks
- Secure Row Level Security
- Responsive UI

## Setup Instructions
1. Clone the repository
2. Add environment variables
3. Run `npm install`
4. Run `npm run dev`

## Problems Faced & Solutions
- **Google OAuth redirect issues**  
  Fixed by configuring correct Supabase and Google Cloud redirect URLs.
- **Auth state handling in App Router**  
  Resolved by moving auth logic to client components.
- **Realtime updates inconsistency**  
  Implemented reliable refetch strategy after mutations to ensure UI consistency.

## Deployment
Deployed on Vercel with environment-based configuration.
