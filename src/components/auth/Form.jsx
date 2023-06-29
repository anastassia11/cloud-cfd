import { useState } from 'react'

export default function Form({ title, handleClick }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
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
                    className="w-full px-4 h-9 text-base  font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300">
                    {title}
                </button>
            </form>
        </div>
    )
}
