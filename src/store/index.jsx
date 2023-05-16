import { configureStore } from '@reduxjs/toolkit'
import simulationReduser from './simulationSlice'

export default configureStore({
    reducer: {
        simulations: simulationReduser,
    }
})
