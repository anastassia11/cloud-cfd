import Login from '@/components/user/Login'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginPage() {
    return (
        <div className='w-96 h-96 m-auto mt-20'>
            <h1 className='text-2xl mb-4 font-medium'>CloudCFD Log in</h1>
            <div className='flex flex-row space-x-1 mb-4' >
                <p>Don&apos;t have an account?</p>
                <Link href="/register" className='text-sky-700 underline'>Sign up</Link>
            </div >
            <Login />
        </div >
    )
}
