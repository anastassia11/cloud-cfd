import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
    return (
        <>
            <h1>CloudCFD Log in</h1>
            <p>Don&apos;t have an account?
                <Link href="/register"
                    className='text-sky-700 underline'> Sign up</Link></p>
        </>

    )
}
