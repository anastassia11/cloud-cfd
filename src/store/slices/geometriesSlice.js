import updateGeometry from '@/pages/api/update_geom'
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

        updateGeometries(state, action) {
            const updatedGeom = action.payload
            state.geometries = state.geometries.map((geom) => {
                if (geom.uid === updatedGeom.uid) {
                    return updatedGeom
                } else return geom
            })
            const result = updateGeometry(1, JSON.stringify(state.geometries))
            console.log(result)
        },

        deleteGeometries(state, action) {
            const deletedGeom = action.payload
            state.geometries = state.geometries.filter((geom) => geom.uid !== deletedGeom.uid)
            const result = updateGeometry(1, JSON.stringify(state.geometries))
            console.log(result)
        }
    }
})

export const { setGeometries, updateGeometries, deleteGeometries } = geometriesSlice.actions;
export default geometriesSlice.reducer