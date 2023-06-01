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
        // <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
        //     <form
        //         onSubmit={(e) => e.preventDefault()}
        //         className="space-y-5">
        //         <div>
        //             <label className="font-medium">
        //                 Email
        //             </label>
        //             <input
        //                 type="email"
        //                 required
        //                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        //             />
        //         </div>
        //         <div>
        //             <label className="font-medium">
        //                 Password
        //             </label>
        //             <input
        //                 type="password"
        //                 required
        //                 className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        //             />
        //         </div>
        //         <button
        //             className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        //             Sign in
        //         </button>
        //     </form>
        // </div>
    )
}
