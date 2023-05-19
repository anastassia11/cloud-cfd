import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase'
import Form from './Form'

export default function Register() {
    const handleRegister = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .catch(() => alert('invalid user'))
    }

    return (
        <Form title='Create Account' handleClick={handleRegister} />
    )
}
