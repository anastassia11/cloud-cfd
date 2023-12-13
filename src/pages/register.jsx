import RegisterDemo from '@/components/auth/RegisterDemo'
import Head from 'next/head'
import React from 'react'

export default function RegisterPage() {
    return (
        <>
            <Head>
                <title>
                    CLoudCFD | Регистрация
                </title>
            </Head>
            <main className="w-screen h-[calc(100vh-56px)] flex flex-col items-center pt-[5%] bg-day-50 overflow-scroll">
                {/* <RegisterDemo /> */}
            </main>
        </>

    )
}
RegisterPage.requiresAuth = false