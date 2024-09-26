'use client';

import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  )
}