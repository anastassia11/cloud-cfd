import { configureStore } from '@reduxjs/toolkit'
import geometryReducer from './slices/geometryReducer'


export default configureStore({
    reducer: {
        geometries: geometryReducer,
    }
})
