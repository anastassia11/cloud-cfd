import { useRouter } from 'next/router'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import auth from '@/pages/api/auth'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin = async (email, password) => {
        const result = await auth('Login', email, password)

        if (result.success) {
            dispatch(setUser({ email }))
            router.push('/')
        } else {
            alert(result.message)
        }
    }

    return (
        <div className="space-y-6 w-96">
            <div className="text-center">
                <div className="mt-5 space-y-2">
                    <h3 className="text-day-350 text-2xl font-bold sm:text-3xl">CloudCFD Log in</h3>
                    <p className="text-day-300">Don&apos;t have an account?
                        <Link href="/register" className="font-medium text-orange-150 hover:text-orange-200 pl-1">Sign up</Link>
                    </p>
                </div>
            </div>
            <Form title='Log in' handleClick={handleLogin} />
        </div>
    )
}
