import { createSlice } from '@reduxjs/toolkit'

const geometriesSlice = createSlice({
    name: 'geometries',
    initialState: {
        geometries: []
    },

    reducers: {
        setGeometries(state, action) {
            state.geometries = action.payload
        },
        addGeometries(state, action) {
            state.geometries.push(action.payload)
        },
        updateGeometries(state, action) { },
        deleteGeometries(state, action) { }
    }
})

export const { setGeometries, addGeometries } = geometriesSlice.actions;
export default geometriesSlice.reducer