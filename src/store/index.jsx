import { configureStore } from '@reduxjs/toolkit'
import geometriesReducer from './slices/geometriesSlice'
import settingReducer from './slices/settingSlice'
import paramsReducer from './slices/paramsSlice'
import loaderReducer from './slices/loaderSlice'

export default configureStore({
    reducer: {
        geometries: geometriesReducer,
        setting: settingReducer,
        params: paramsReducer,
        loader: loaderReducer,
    }
})
