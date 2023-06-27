import { useRouter } from 'next/router'
import Form from './Form'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import auth from '@/pages/api/auth'

export default function Register() {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleRegister = async (email, password) => {
        const result = await auth('Register', email, password)

        if (result.success) {
            dispatch(setUser({ email }))
            router.push('/')
        } else {
            alert(result.message)
        }
    }

    return (
        <Form title='Create Account' handleClick={handleRegister} />
    )
}
