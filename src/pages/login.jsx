import Login from '@/components/auth/Login'
import Layout from '@/components/layouts/Layout'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex flex-col items-center pt-32 bg-gray-50 sm:px-4">
            <div className="space-y-6 text-gray-600 w-96">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">CloudCFD Log in</h3>
                        <p className="">Don&apos;t have an account?
                            <Link href="/register" className="font-medium text-gray-950 hover:text-[#f98a2a] pl-1">Sign up</Link>
                        </p>
                    </div>
                </div>
                <Login />
            </div>
        </main>

    )
}
