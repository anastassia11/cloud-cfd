import updateGeometry from '@/api/update_geom'
import { createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectId: null,
        simulations: [],
        geometries: [],
        mesh: false,
        selectedPart: [],
        jobStatus: null,
        sceneMode: 'geom',
    },

    reducers: {
        setProject(state, action) {
            state.projectId = action.payload.projectId
        },

        setGeometries(state, action) {
            state.geometries = action.payload.geometries
        },

        addSelectedPart(state, action) {
            state.selectedPart.push(action.payload.addedPart)
        },

        deleteSelectedPart(state, action) {
            state.selectedPart = state.selectedPart.filter((part) => part !== action.payload.deletedPart)
        },

        updateGeometries(state, action) {
            const updatedGeom = action.payload.updatedGeometry
            state.geometries = state.geometries.map((geom) => {
                if (geom.uid === updatedGeom.uid) {
                    return updatedGeom
                } else return geom
            })
            const result = updateGeometry(1, state.geometries)
        },

        deleteGeometries(state, action) {
            const deletedGeom = action.payload.deletedGeometry
            state.geometries = state.geometries.filter((geom) => geom.uid !== deletedGeom.uid)
            const result = updateGeometry(action.payload.projectId, state.geometries)

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

        setJobStatus(state, action) {
            state.jobStatus = action.payload
        },

        setSceneMode(state, action) {
            state.sceneMode = action.payload
        },

        setMesh(state, action) {
            state.mesh = action.payload
        }
    }
})

export const { setProject,
    setGeometries, updateGeometries, deleteGeometries,
    setSimulations, addSimulation, deleteSimulation,
    addSelectedPart, deleteSelectedPart,
    setJobStatus, setSceneMode, setMesh } = projectSlice.actions;
export default projectSlice.reducer