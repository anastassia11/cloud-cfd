import updateGeometry from '@/pages/api/update_geom'
import { createSlice } from '@reduxjs/toolkit'
import meshFormDefault from '@/components/tree-panel/assets/meshFormData.json'

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectId: null,
        simulations: [],
        geometries: [],
        selectedPart: [],
        meshParams: meshFormDefault
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
            const result = updateGeometry(1, JSON.stringify(state.geometries))
        },

        deleteGeometries(state, action) {
            const deletedGeom = action.payload.deletedGeometry
            state.geometries = state.geometries.filter((geom) => geom.uid !== deletedGeom.uid)
            const result = updateGeometry(action.payload.projectId, JSON.stringify(state.geometries))

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

        setMeshParams(state, action) {
            const params = action.payload.params
            for (let key in params) {
                state.meshParams[key] = params[key]
            }
        },
    }
})

export const { setProject, setGeometries, updateGeometries, deleteGeometries,
    setSimulations, addSimulation, deleteSimulation, addSelectedPart, deleteSelectedPart,
    setMeshParams } = projectSlice.actions;
export default projectSlice.reducer