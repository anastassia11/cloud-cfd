import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { BarLoader } from 'react-spinners'
import { useEffect, useRef } from 'react'

export default function DemoHeader() {
    const router = useRouter()
    const loader = useSelector(state => state.loader.loader)
    const email = useRef(null)
    const login = useRef(null)

    const handleContactsClick = () => {
        if (router.pathname !== '/') {
            router.push('/').then(() => {
                const contacts = document.getElementById('contacts');
                contacts.scrollIntoView({ behavior: 'smooth' });
            })
        } else {
            const contacts = document.getElementById('contacts');
            contacts.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        email.current = localStorage.getItem('email')
        login.current = email.current?.split('@')[0]
    }, [router])

    return (
        <header className="fixed top-0 z-100 flex flex-col">
            <div className="flex flex-row bg-white/90 w-screen h-[56px] p-4 justify-between items-center border-b 
                border-[#e6e6e6] ">
                <div className='text-day-300 text-3xl cursor-pointer' onClick={() => router.push(' /')} >
                    <span className='font-semibold'> Cloud</span>
                    <span className='font-semibold text-orange-100'>CFD</span>
                </div>

                <div className='flex flex-row items-center space-x-1'>

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
                            onClick={() => router.push('/login')}>
                            Вход
                        </button>
                    </div>
                </div>
            </div >
            <div className='absolute top-[54px] w-full'>
                <BarLoader color="#e66e0d" width='100%' speedMultiplier={0.3} height={2} loading={loader} />
            </div>
        </header >
    )
}