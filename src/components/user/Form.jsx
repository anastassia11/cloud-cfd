import { useState } from 'react'

export default function Form({ title, handleClick }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='flex flex-col '>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}
                className='mt-2 h-8 rounded border-[1px] border-gray-200 p-2 focus:outline-[0]' />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}
                className='mt-2 h-8 rounded border-[1px] border-gray-200 p-2 focus:outline-[0]' />
            <button onClick={() => handleClick(email, password)}
                className='mt-4 bg-gray-200 h-8 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>{title}</button>
        </div>
    )
}
