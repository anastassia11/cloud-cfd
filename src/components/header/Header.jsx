import Link from 'next/link'
import Image from 'next/image'
import logo from '@/../public/logo.jpg'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'

export default function Header() {
    const router = useRouter()
    const email = localStorage.getItem('email')
    const login = email?.split('@')[0]
    const loader = useSelector(state => state.loader.loader)

    const handleLogOutClick = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <header className="flex flex-col">
            <div className="flex flex-row bg-day-00 w-screen h-[56px] p-4 justify-between items-center border-b 
                border-[#e6e6e6] pr-8">
                <Image src={logo} width={500} height={500} alt='cloudCFD'
                    className='w-32 cursor-pointer' onClick={() => router.push(' /')} />
                <div className='flex flex-row items-center space-x-1'>
                    <Link href="/dashboard" prefetch={true}
                        className='text-day-350 hover:bg-day-50 flex items-center hover:border-b-2 
                            hover:border-orange-100 duration-100 h-[56px] px-3'
                        onClick={() => router.push('/dashboard')}>
                        Dashboard
                    </Link>
                    <button className='relative group text-day-350 hover:bg-day-50 flex items-center 
                        hover:border-b-2 hover:border-orange-100 duration-100 h-[56px] px-3'>
                        <p className='pr-1'>Help</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className='w-5 h-5 duration-300 group-hover:rotate-180'>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        <div className='invisible group-hover:visible py-2 bg-white rounded-lg shadow absolute 
                            top-[46px] border border-day-200 right-0 w-44 text-base z-20 duration-100 opacity-0 group-hover:opacity-100 
                            ease-linear transition-all group-hover:translate-y-[10px]'>
                            <Link href="/documentation"
                                className='text-day-350 hover:bg-day-100 p-1.5 mx-2 rounded-md text-left pl-3'>
                                Documentation
                            </Link>
                        </div>
                    </button>

                    <button className='relative group text-day-350 hover:bg-day-50 flex items-center 
                        hover:border-b-2 hover:border-orange-100 duration-100 h-[56px] px-3'>
                        <div className='w-8 h-8 mr-2 rounded-full bg-day-250 flex items-center justify-center' >
                            <p className='text-white uppercase text-[22px]  font-medium '>
                                {email && email[0]}
                            </p>
                        </div>
                        <p className='pr-1'>{login}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className='w-5 h-5 duration-300 group-hover:rotate-180'>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        <div className='invisible group-hover:visible py-2 bg-white rounded-lg shadow absolute 
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
                    </button>
                </div>
            </div>
            <div className='absolute top-[54px] w-full'>
                <BarLoader color="#e66e0d" width='100%' speedMultiplier={0.3} height={2} loading={loader} />
            </div>

        </header>
    )
}