import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setUser } from '@/store/slices/userSlice';

export default function Header() {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch(setUser({
                email: user?.email,
                id: user?.uid,
                token: user?.accessToken,
            }))
        })
        return unsubscribe
    }, [dispatch])

    const { email, token, id } = useSelector(state => state.user);

    const handleLogOutClick = () => {
        signOut(auth)
    }
    return (
        <header className="flex flex-row bg-white w-screen h-12 p-4 shadow justify-end items-center" >
            <p className=''>{email}</p>
            <button onClick={handleLogOutClick}
                className='mx-2 w-20 bg-gray-200 h-8 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                Logout
            </button>
        </header>
    )
}