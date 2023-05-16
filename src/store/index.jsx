import { configureStore } from '@reduxjs/toolkit'
import simulationReduser from './slices/simulationSlice'
import userReduser from './slices/userSlice'

export default configureStore({
    reducer: {
        simulations: simulationReduser,
        user: userReduser
    }
})
