import Link from 'next/link'
import React, { useState } from 'react'
import Form from './Form'
import { useRouter } from 'next/router'
import saveContact from '@/pages/api/save_contact'
import RegisterFormDemo from './RegisterFormDemo'

export default function RegisterDemo() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [formData, setFormData] = useState({
        "contactId": 0,
        "fio": null,
        "company": null,
        "phoneNumber": null,
        "email": null
    })

    return (
        <div className="space-y-6 flex flex-col items-center" id='demo'>
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="text-day-350 text-2xl font-bold sm:text-3xl">Регистрация в
                        <span className='font-semibold'> Cloud</span>
                        <span className='font-semibold text-orange-100'>CFD</span></h3>
                    <p className="text-day-300">Оставьте нам свои контакты. Уже есть аккаунт?
                        <button onClick={() => router.push('/login')} className="font-medium text-orange-150 hover:text-orange-200 pl-1">Войти</button>
                    </p>
                </div>
            </div>
            <RegisterFormDemo />
        </div>
    )
}

