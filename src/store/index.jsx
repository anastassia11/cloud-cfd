import { configureStore } from '@reduxjs/toolkit'
import userReduser from './slices/userSlice'

export default configureStore({
    reducer: {
        user: userReduser
    }
})
