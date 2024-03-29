import updateGeometry from '@/api/update_geom'
import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectId: null,
        simulations: [],
        geometries: [],
        selectedParts: [],
        stateBar: {
            visible: false,
            type: '',
            message: ''
        },
        sceneMode: 'geom',
    },

    reducers: {
        setProject(state, action) {
            state.projectId = action.payload.projectId
        },

        setGeometries(state, action) {
            state.geometries = action.payload.geometries
        },

        setSelectedParts(state, action) {
            state.selectedParts = action.payload
        },

        updateGeometries(state, action) {
            const updatedGeom = action.payload.updatedGeometry
            state.geometries = state.geometries.map((geom) => {
                if (geom.uid === updatedGeom.uid) {
                    return updatedGeom
                } else return geom
            })
            const result = updateGeometry(state.projectId, state.geometries)
        },

        deleteGeometries(state, action) {
            const deletedGeom = action.payload.deletedGeometry
            state.geometries = state.geometries.filter((geom) => geom.uid !== deletedGeom.uid)
            const result = updateGeometry(state.projectId, state.geometries)
        },

        setSimulations(state, action) {
            state.simulations = action.payload.simulations
        },

        addSimulation(state, action) {
            state.simulations.push(action.payload.newSimulation)
        },

        deleteSimulation(state, action) {
            const deletedSimId = action.payload.deletedSimulation
            state.simulations = state.simulations.filter((sim) => sim.id !== deletedSimId)
        },

        setStateBar(state, action) {
            state.stateBar = { ...state.stateBar, ...action.payload }
        },

        setSceneMode(state, action) {
            state.sceneMode = action.payload
        },
    }
})

export const { setProject,
    setGeometries, updateGeometries, deleteGeometries,
    setSimulations, addSimulation, deleteSimulation,
    setSelectedParts, setStateBar, setSceneMode } = projectSlice.actions;
export default projectSlice.reducer