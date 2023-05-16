import { useDispatch } from 'react-redux'
import { removeUser } from '@/store/slices/userSlice'

export default function Header() {
    const dispatch = useDispatch()
    return (
        <header className="flex flex-row bg-white w-screen h-12 p-4 shadow justify-end items-center" >
            <button onClick={() => dispatch(removeUser())}
                className='w-20 bg-gray-200 h-8 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                Logout
            </button>
        </header>
    )
}