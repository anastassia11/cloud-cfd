import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from '@/firebase'
import Form from './Form'

export default function Login() {
    const dispatch = useDispatch()

    onAuthStateChanged(auth, (currentUser) => {
        dispatch(setUser({
            email: currentUser?.email,
            id: currentUser?.uid,
            token: currentUser?.accessToken,
        }))
    })

    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                // dispatch(setUser({
                //     email: user.email,
                //     id: user.uid,
                //     token: user.accessToken,
                // }))
            })
            .catch(() => alert('invalid user'))
    }

    return (
        <Form title='Log in' handleClick={handleLogin} />
    )
}
