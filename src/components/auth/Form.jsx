import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

export default function Form({ title, handleClick, loading, errorMessage }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="bg-white shadow p-4 py-6 space-y-8 rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {errorMessage && <div className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 bg-red-50">
                    {errorMessage}
                </div>}
                <div>
                    <label htmlFor='email' className="font-medium text-day-350">
                        Email
                    </label>
                    <input required name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 px-4 h-9 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 border-day-100 focus:border-day-250 shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor='password' className="font-medium text-day-350">
                        Пароль
                    </label>
                    <input required name='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-4 h-9 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 border-day-100 focus:border-day-250 shadow-sm"
                    />
                </div>
                <button onClick={() => handleClick(email, password)}
                    disabled={loading}
                    className="disabled:bg-orange-disabled w-full px-4 h-9 text-base font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 flex items-center justify-center">
                    {loading ?
                        <Oval
                            height={20}
                            width={20}
                            color="#FFFFFF"
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#FFFFFF"
                            strokeWidth={4}
                            strokeWidthSecondary={4} /> : title}
                </button>
            </form>
        </div>
    )
}
