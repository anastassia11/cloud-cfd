import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './slices/settingSlice'
import paramsReducer from './slices/paramsSlice'
import loaderReducer from './slices/loaderSlice'
import projectReducer from './slices/projectSlice'
import meshReducer from './slices/meshSlice'

export default configureStore({
    reducer: {
        setting: settingReducer,
        params: paramsReducer,
        loader: loaderReducer,
        project: projectReducer,
        mesh: meshReducer,
    }
})
