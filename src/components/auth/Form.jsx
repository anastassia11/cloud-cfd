import Image from 'next/image'
import { useState } from 'react'
import { Oval } from 'react-loader-spinner'

export default function Form({ title, handleClick, loading }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="bg-white shadow p-4 py-6 space-y-8 rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                    <label className="font-medium text-day-350">
                        Email
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 px-4 h-9 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 border-day-100 focus:border-day-250 shadow-sm"
                    />
                </div>
                <div>
                    <label className="font-medium text-day-350">
                        Password
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
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
