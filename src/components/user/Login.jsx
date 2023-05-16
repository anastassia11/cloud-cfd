import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Form from './Form'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                router.push('/')
            })
            .catch(() => alert('invalid user'))
    }

    return (
        <Form title='Log in' handleClick={handleLogin} />
    )
}
