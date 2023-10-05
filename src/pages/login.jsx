import Login from '@/components/auth/Login'
import React from 'react'

export default function LoginPage() {
    return (
        <main className="w-screen h-screen flex flex-col items-center pt-[10%] pb-[10%] bg-day-50 overflow-scroll">
            <Login />
        </main>
    )
}

LoginPage.requiresAuth = false
