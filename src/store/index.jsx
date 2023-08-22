import { configureStore } from '@reduxjs/toolkit'
import geometriesReducer from './slices/geometriesSlice'


export default configureStore({
    reducer: {
        geometries: geometriesReducer,
    }
})
