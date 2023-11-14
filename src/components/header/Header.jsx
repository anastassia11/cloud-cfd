import Link from 'next/link'
import Image from 'next/image'
import logo from '@/../public/logo.jpg'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { useEffect, useRef, useState } from 'react'
import DemoHeader from './DemoHeader'

export default function Header() {
    const router = useRouter()
    const loader = useSelector(state => state.loader.loader)
    const email = useRef(null)
    const login = useRef(null)
    const token = localStorage.getItem('token')
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogOutClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        router.push('/login')
    }

    useEffect(() => {
        email.current = localStorage.getItem('email')
        login.current = email.current?.split('@')[0]
    }, [router])

    return (
        <>
            {token ?
                <>
                    <div className={`fixed inset-0 w-full h-full bg-black opacity-40 ${menuOpen ? 'block' : 'hidden'}`}></div>
                    <header className="fixed top-0 z-50 flex flex-col">
                        <div className="flex flex-row bg-day-00 w-screen h-[56px] p-4 justify-between items-center border-b 
                border-[#e6e6e6] ">
                            <div className='text-day-300 text-3xl cursor-pointer' onClick={() => router.push(' /')} >
                                <span className='font-semibold'> Cloud</span>
                                <span className='font-semibold text-orange-100'>CFD</span>
                            </div>
                            <div className='flex flex-row items-center space-x-1'>
                                {token && <Link href="/dashboard"
                                    className='md:flex hidden text-day-350 hover:bg-day-50 items-center hover:border-b-2 
                            hover:border-orange-100 duration-100 h-[56px] px-3'
                                    onClick={() => router.push('/dashboard')}>
                                    Dashboard
                                </Link>}
                                <button className='md:flex hidden relative group text-day-350 hover:bg-day-50 items-center 
                        hover:border-b-2 hover:border-orange-100 duration-100 h-[56px] px-3'>
                                    <p className='pr-1'>Help</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className='w-5 h-5 duration-300 group-hover:rotate-180'>
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                    <div className='py-2 bg-white rounded-lg shadow absolute invisible group-hover:visible
                            top-[46px] border border-day-200 right-0 w-44 text-base z-20 duration-100 opacity-0 group-hover:opacity-100 
                            ease-linear transition-all group-hover:translate-y-[10px] flex'>
                                        <Link href="/documentation"
                                            className='w-full text-day-350 hover:bg-day-100 p-1.5 mx-2 rounded-md text-left pl-3'>
                                            Documentation
                                        </Link>
                                    </div>
                                </button>
                                {!token && <Link href="/pricing" prefetch={true}
                                    className='md:flex hidden text-day-350 hover:bg-day-50 items-center hover:border-b-2 
                            hover:border-orange-100 duration-100 h-[56px] px-3'
                                    onClick={() => router.push('/pricing')}>
                                    Pricing
                                </Link>}
                                {token && <div className='md:flex hidden relative group text-day-350 hover:bg-day-50  items-center 
                        hover:border-b-2 hover:border-orange-100 duration-100 h-[56px] px-3 cursor-pointer'>
                                    <div className='w-8 h-8 mr-2 rounded-full bg-day-250 flex items-center justify-center' >
                                        <p className='text-white uppercase text-[22px]  font-medium '>
                                            {email.current && email.current[0]}
                                        </p>
                                    </div>
                                    <p className='pr-1'>{login.current}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className='w-5 h-5 duration-300 group-hover:rotate-180'>
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                    <div className='py-2 bg-white rounded-lg shadow absolute invisible group-hover:visible
                            top-[46px] border border-day-200 right-0 w-44 text-base z-20 duration-100 opacity-0 group-hover:opacity-100 
                            ease-linear transition-all group-hover:translate-y-[10px]'>
                                        <div className='flex flex-col'>
                                            <Link href="/dashboard"
                                                className='text-day-350 hover:bg-day-100 p-1.5 mx-2 rounded-md text-left pl-3'>
                                                Dashboard
                                            </Link>
                                            <button className='flex flex-row space-x-1 text-day-350 hover:bg-day-100 p-1.5 pl-2 
                                mx-2 rounded-md'
                                                onClick={handleLogOutClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                                </svg>
                                                <p>Logout</p>
                                            </button>
                                        </div>

                                    </div>
                                </div>}
                                {!token && <div className='md:flex hidden items-center h-[56px] pl-3'>
                                    <button className="disabled:bg-orange-disabled w-full px-4 h-9 text-base font-medium 
                    text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 
                    flex items-center justify-center"
                                        onClick={() => router.push('/login')}>
                                        Log In
                                    </button>
                                </div>}
                                <div className="block md:hidden">
                                    <button className="p-2 pr-0 transition text-day-300 hover:text-day-350"
                                        onClick={() => setMenuOpen(!menuOpen)} >
                                        {
                                            menuOpen ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                </svg>
                                            )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div >
                        <div className={`bg-day-50 md:flex flex-col items-start px-3 py-3 w-[60%] self-end h-screen fixed top-[56px] 
                duration-300 ${menuOpen ? 'right-0 flex' : 'opacity-0 -right-56'}`}>
                            <button
                                className='text-day-350 pb-2 w-full text-left'
                                onClick={() => router.push('/dashboard')}>
                                Dashboard
                            </button>

                            <button
                                className='text-day-350 py-2 border-t w-full text-left'>
                                Documentation
                            </button>

                            <div className='text-day-350 py-2 border-t w-full text-left'>
                                <button className='disabled:bg-orange-disabled w-full px-4 h-9 text-base font-medium 
                    text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 
                    flex items-center justify-center'
                                    onClick={handleLogOutClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    <p className='pl-2 pt-[2px]'>Logout</p>
                                </button>
                            </div>

                        </div>
                        <div className='absolute top-[54px] w-full'>
                            <BarLoader color="#e66e0d" width='100%' speedMultiplier={0.3} height={2} loading={loader} />
                        </div>
                    </header >
                </>
                :
                <DemoHeader />}
        </>

    )
}