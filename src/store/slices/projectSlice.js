import updateGeometry from '@/pages/api/update_geom'
import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        idProject: null,
        geometries: []
    },

    reducers: {
        setProject(state, action) {
            state.idProject = action.payload.idProject
        },

        setGeometries(state, action) {
            state.geometries = action.payload.geometries
        },

        updateGeometries(state, action) {
            const updatedGeom = action.payload.updatedGeometry
            state.geometries = state.geometries.map((geom) => {
                if (geom.uid === updatedGeom.uid) {
                    return updatedGeom
                } else return geom
            })
            const result = updateGeometry(1, JSON.stringify(state.geometries))
        },

        deleteGeometries(state, action) {
            const deletedGeom = action.payload.deletedGeometry
            state.geometries = state.geometries.filter((geom) => geom.uid !== deletedGeom.uid)
            const result = updateGeometry(action.payload.idProject, JSON.stringify(state.geometries))
        }
    }
})

export const { setProject, setGeometries, updateGeometries, deleteGeometries } = projectSlice.actions;
export default projectSlice.reducer