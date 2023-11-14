import RegisterDemo from '@/components/auth/RegisterDemo'
import React from 'react'

export default function RegisterPage() {
    return (
        <main className="w-screen h-[calc(100vh-56px)] flex flex-col items-center pt-[5%] bg-day-50 overflow-scroll">
            {/* <RegisterDemo /> */}
        </main>
    )
}
RegisterPage.requiresAuth = false