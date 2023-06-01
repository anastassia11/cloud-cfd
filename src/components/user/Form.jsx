import { useState } from 'react'

export default function Form({ title, handleClick }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Password
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <button onClick={() => handleClick(email, password)}
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    {title}
                </button>
            </form>
        </div>
    )
}
