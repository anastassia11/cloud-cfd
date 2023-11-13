import Login from '@/components/auth/Login'
import React from 'react'

export default function LoginPage() {
    return (
        <main className="w-screen h-[calc(100vh-56px)] flex flex-col items-center pt-[10%]  bg-day-50 overflow-scroll">
            <Login />
        </main>
    )
}
// вернуть false
LoginPage.requiresAuth = false
