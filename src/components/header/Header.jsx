import Link from 'next/link'
import Image from 'next/image'
import logo from '@/../public/logo.jpg'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const [userOpen, setUserOpen] = useState(false)
    const router = useRouter()
    const { email } = useSelector(state => state.user)

    const login = email?.split('@')[0]

    const handleLogOutClick = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <header className="flex flex-row bg-white w-screen h-14 p-4 shadow justify-between items-center">
            <Image src={logo} width={500} height={500} alt='cloudCFD'
                className='w-44 cursor-pointer' onClick={() => router.push('/')} />
            <div className='flex flex-row items-center'>
                <Link href="/dashboard" prefetch={true}
                    className='text-gray-700 hover:bg-gray-50 flex items-center hover:border-b-2 hover:border-[#fe8729] duration-150 h-[56px] px-2'
                    onClick={() => router.push('/dashboard')}>
                    Dashboard
                </Link>
                <button className='flex flex-row items-center hover:bg-gray-50 hover:border-b-2 hover:border-[#fe8729] duration-150 h-[56px] text-gray-700 px-2' onClick={() => setUserOpen(!userOpen)}>
                    <p className='mr-2'>{login}</p>
                    <div className='w-10 h-10 rounded-full bg-[#999999] opacity-80 flex items-center justify-center' >
                        <p className='text-white uppercase text-[32px] font-medium '>
                            {email && email[0]}
                        </p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 duration-150 ${userOpen ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
                {userOpen && <div className='flex flex-col py-2 bg-white rounded-lg shadow absolute top-[62px] right-3 w-44 text-base'>
                    <Link href="/dashboard"
                        className='text-gray-600 w-full hover:bg-gray-100 p-1.5 pl-3 text-left'>
                        Dashboard
                    </Link>
                    <button className='flex flex-row space-x-1 text-gray-600 w-full hover:bg-gray-100 p-1.5 pl-2 text-left'
                        onClick={handleLogOutClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        <p>Logout</p>
                    </button>
                </div>}
            </div>
        </header>
    )
}