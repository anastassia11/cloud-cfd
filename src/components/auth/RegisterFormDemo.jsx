import saveContact from '@/api/save_contact'
import React, { useState } from 'react'

export default function RegisterFormDemo() {
    const [done, setDone] = useState(false)
    const [formData, setFormData] = useState({
        "contactId": 0,
        "fio": null,
        "company": null,
        "phoneNumber": null,
        "email": null
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        submitContact()
    }

    const submitContact = async () => {
        const result = await saveContact(formData)
        if (result.success) {
            setDone(true)
        } else {
            alert(result.message)
        }
    }

    return (
        <div>
            {done ? <p >
                Спасибо! Мы скоро с Вами свяжемся.
            </p> :
                <div className='bg-white shadow p-4 py-6 space-y-8 rounded-lg sm:w-96 w-80'>
                    <form onSubmit={handleFormSubmit} className="space-y-5" >
                        <div>
                            <label htmlFor='name' className="font-medium">
                                Имя
                            </label>
                            <input name='name' type="text" required value={formData.fio}
                                onChange={e => setFormData(prev => ({ ...prev, fio: e.target.value }))}
                                className="w-full mt-2 px-3 py-2 bg-day-00 outline-none 
                                        border focus:border-indigo-600 shadow-sm rounded-lg" />
                        </div>
                        <div>
                            <label htmlFor='company' className="font-medium">
                                Организация
                            </label>
                            <input name='company' type="text" required value={formData.company}
                                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                className="w-full mt-2 px-3 py-2 bg-day-00 outline-none 
                                        border focus:border-indigo-600 shadow-sm rounded-lg"/>
                        </div>
                        <div>
                            <label htmlFor='email' className="font-medium">
                                Email
                            </label>
                            <input name='email' type="email" required value={formData.email}
                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full mt-2 px-3 py-2 bg-day-00 outline-none border 
                                    focus:border-indigo-600 shadow-sm rounded-lg" />
                        </div>
                        <div>
                            <label className="font-medium" htmlFor='phoneNumber'>
                                Номер телефона
                            </label>
                            <div className="relative mt-2">
                                <input type="tel"
                                    name='phoneNumber' id='phoneNumber'
                                    placeholder="+7 (999) 999-99-99" value={formData.phoneNumber}
                                    onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                    required
                                    className="w-full px-3 py-2 appearance-none bg-day-00 outline-none border 
                                            focus:border-indigo-600 shadow-sm rounded-lg" />
                            </div>
                        </div>
                        <button type='submit'
                            className="w-full px-4 py-2 text-white font-medium shadow-md
                                    bg-orange-100 hover:bg-orange-150 hover:shadow-lg active:bg-orange-200 
                                    rounded-lg duration-150">
                            Зарегистрироваться
                        </button>
                    </form></div>}
        </div>
    )
}
