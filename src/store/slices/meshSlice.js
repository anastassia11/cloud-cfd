import { createSlice } from '@reduxjs/toolkit'

const meshSlice = createSlice({
    name: 'mesh',
    initialState: {
        meshes: [],
        currentMesh: {
            uid: null,
            path: null,
            isClip: null
        },
        point: {
            visible: true,
            position: { x: 0, y: 0, z: 0 },
            size: 0,
        }
    },

    reducers: {
        setPoint(state, action) {
            state.point = {
                ...state.point, ...action.payload
            };
        },
        setMeshes(state, action) {
            state.meshes = action.payload.meshes;
        },
        setCurrentMesh(state, action) {
            state.currentMesh = action.payload;
        },
    },
})

export const { setPoint, setMeshes,
    setCurrentMesh } = meshSlice.actions;
export default meshSlice.reducer