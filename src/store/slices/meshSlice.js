import { createSlice } from '@reduxjs/toolkit'

const meshSlice = createSlice({
    name: 'mesh',
    initialState: {
        meshes: {},
        currentMesh: {
            uid: null,
            path: null,
        },
        pointVisible: true,
        pointPosition: { x: 0, y: 0, z: 0 },
    },

    reducers: {
        setPointPosition(state, action) {
            state.pointPosition = action.payload.position;
        },
        setPointVisible(state, action) {
            state.pointVisible = action.payload.visible;
        },
        setMeshes(state, action) {
            state.meshes = action.payload.meshes;
        },
        setCurrentMesh(state, action) {
            state.currentMesh = action.payload;
        },
    },
})

export const { setPointPosition, setPointVisible, setMeshes,
    setCurrentMesh } = meshSlice.actions;
export default meshSlice.reducer