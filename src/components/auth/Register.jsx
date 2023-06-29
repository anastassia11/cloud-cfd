import { useRouter } from 'next/router'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import auth from '@/pages/api/auth'
import Link from 'next/link'
import { useState } from 'react'

export default function Register() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleRegister = async (email, password) => {
        setLoading(true)
        const result = await auth('Register', email, password)

        if (result.success) {
            dispatch(setUser({ email }))
            router.push('/')
        } else {
            alert(result.message)
        }
    }

    return (
        <div className="space-y-6  w-96">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="text-day-350 text-2xl font-bold sm:text-3xl">Sign up for CloudCFD</h3>
                    <p className="text-day-300">Already have an account?
                        <Link href="/login" className="font-medium text-orange-150 hover:text-orange-200 pl-1">Sign in</Link>
                    </p>
                </div>
            </div>
            <Form title='Create Account' handleClick={handleRegister} loading={loading} />
        </div>
    )
}
