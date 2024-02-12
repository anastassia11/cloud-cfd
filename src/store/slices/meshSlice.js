import setMeshData from '@/api/set_mesh_data';
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

const meshSlice = createSlice({
    name: 'mesh',
    initialState: {
        settings: {},
        meshes: [],
        layerGroups: [],
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
        setLayerGroups(state, action) {
            state.layerGroups = action.payload;
        },
        setCurrentMesh(state, action) {
            state.currentMesh = action.payload;
        },
        setSettingsMesh(state, action) {
            state.settings = action.payload;
        },
    },
})

export const { setPoint, setMeshes, setLayerGroups,
    setCurrentMesh, setSettingsMesh } = meshSlice.actions;
export default meshSlice.reducer