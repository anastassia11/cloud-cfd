import { useRouter } from 'next/router'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import auth from '@/pages/api/auth'

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
        <Form title='Log in' handleClick={handleLogin} />
    )
}
