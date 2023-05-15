import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
    return (
        <>
            <h1>Sign up for CloudCFD</h1>
            <p>Already have an account?
                <Link href="/login"
                    className='text-sky-700 underline'>Sign in</Link></p>
        </>

    )
}
