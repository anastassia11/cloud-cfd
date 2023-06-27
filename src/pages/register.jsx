import Register from '@/components/auth/Register'
import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
    return (
        <main className="w-full h-screen flex flex-col items-center pt-32 bg-gray-50 sm:px-4">
            <div className="space-y-6 text-gray-600 w-96">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up for CloudCFD</h3>
                        <p className="">Already have an account?
                            <Link href="/login" className="font-medium text-gray-950 hover:text-[#f98a2a] pl-1">Sign in</Link>
                        </p>
                    </div>
                </div>
                <Register />
            </div>
        </main>
    )
}
