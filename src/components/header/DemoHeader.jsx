import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { useEffect, useRef, useState } from 'react'

export default function DemoHeader() {
    const router = useRouter()
    const loader = useSelector(state => state.loader.loader)
    const email = useRef(null)
    const login = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleContactsClick = () => {
        if (router.pathname !== '/') {
            router.push('/').then(() => {
                const contacts = document.getElementById('contacts');
                contacts.scrollIntoView({ behavior: 'smooth' });
                setMenuOpen(false)
            })
        } else {
            const contacts = document.getElementById('contacts');
            contacts.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false)
        }
    }

    const handleLoginClick = () => {
        router.push('/login')
        setMenuOpen(false)
    }

    useEffect(() => {
        email.current = localStorage.getItem('email')
        login.current = email.current?.split('@')[0]
    }, [router])

    return (
        <>
            <div className={`fixed top-[56px] inset-0 w-full h-full bg-black opacity-40 ${menuOpen ? 'block' : 'hidden'}`}></div>
            <header className="fixed top-0 z-50 flex flex-col">
                <div className="flex flex-row bg-white/90 w-screen h-[56px] p-4 justify-between items-center border-b 
                border-[#e6e6e6] ">
                    <div className='text-day-300 text-3xl cursor-pointer' onClick={() => router.push(' /')} >
                        <span className='font-semibold'> Cloud</span>
                        <span className='font-semibold text-orange-100'>CFD</span>
                    </div>

                    <div className='flex-row items-center space-x-1 hidden md:flex'>
                        <button
                            className='text-day-350 hover:bg-day-50 flex items-center hover:border-b-2 
                            hover:border-orange-100 duration-100 h-[56px] px-3'
                            onClick={handleContactsClick}>
                            Контакты
                        </button>

                        <div className='flex items-center h-[56px] xl:pl-1'>
                            <button className="disabled:bg-orange-disabled w-full px-4 h-9 text-base font-medium 
                    text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 
                    flex items-center justify-center"
                                onClick={handleLoginClick}>
                                Вход
                            </button>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <button className="m-2 mr-0 transition text-day-300 hover:text-day-350"
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
                </div >
                <div className={`bg-day-50 md:block px-3 w-[60%] self-end h-screen fixed top-[56px] 
                duration-300 ${menuOpen ? 'block right-0' : 'opacity-0 -right-[60%]'}`}>
                    <button className='text-day-350 py-3 w-full text-left' onClick={handleContactsClick}>
                        Контакты
                    </button>
                    <button className=" disabled:bg-orange-disabled w-full px-4 h-9 text-base font-medium 
                    text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 
                    flex items-center justify-center"
                        onClick={handleLoginClick}>
                        Вход
                    </button>
                </div>
                <div className='absolute top-[54px] w-full'>
                    <BarLoader color="#e66e0d" width='100%' speedMultiplier={0.3} height={2} loading={loader} />
                </div>
            </header >
        </>
    )
}