import { useRouter } from 'next/router'
import Form from './Form'
import auth from '@/api/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleLogin = async (email, password) => {
        setLoading(true)
        const result = await auth('Login', email, password)
        if (result.success) {
            localStorage.setItem('email', email)
            router.push('/dashboard')
        } else {
            if (result.status === 400) {
                setLoading(false)
                setError('Неверный логин или пароль')
            }
        }
    }

    const handlDemoClick = () => {
        if (router.pathname !== '/') {
            router.push('/').then(() => {
                const demo = document.getElementById('demo');
                demo.scrollIntoView({ behavior: 'smooth' });
            })
        } else {
            const demo = document.getElementById('demo');
            demo.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className="space-y-6 sm:w-96 w-80">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="text-day-350 text-2xl font-semibold sm:text-3xl">Войти в
                        <span className='font-semibold'> Cloud</span>
                        <span className='font-semibold text-orange-100'>CFD</span></h3>
                    <p className="text-day-300">Еще нет аккаунта?
                        <button onClick={handlDemoClick} className="font-medium text-orange-150 hover:text-orange-200 pl-1">Регистрация</button>
                    </p>
                </div>
            </div>
            <Form title='Войти' handleClick={handleLogin} loading={loading} errorMessage={error} />
        </div>
    )
}
