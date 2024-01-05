import { createSlice } from '@reduxjs/toolkit'

const meshSlice = createSlice({
    name: 'mesh',
    initialState: {
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
    },
})

export const { setPointPosition, setPointVisible } = meshSlice.actions;
export default meshSlice.reducer