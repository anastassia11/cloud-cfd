import Register from '@/components/user/Register'
import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
    return (
        <div className='w-96 h-96 m-auto mt-20'>
            <h1 className='text-2xl mb-4 font-medium'>Sign up for CloudCFD</h1>
            <div className='flex flex-row space-x-1 mb-4'>
                <p>Already have an account?</p>
                <Link href="/login" className='text-sky-700 underline'>Sign in</Link>
            </div>
            <Register />
        </div>

    )
}
