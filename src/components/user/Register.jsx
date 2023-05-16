import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Form from './Form'
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleRegister = (email, password) => {
        const auth = getAuth()

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))
                router.push('/')
            })
            .catch(console.error)
    }

    return (
        <Form title='Create Account' handleClick={handleRegister} />
    )
}
