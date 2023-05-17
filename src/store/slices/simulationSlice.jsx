import formDefaultValues from '@/components/tree-panel/assets/formData.json'
import { createSlice } from '@reduxjs/toolkit'

const simulationSlice = createSlice({
    name: 'simulations',
    initialState: {
        userParams: formDefaultValues,
    },
    reducers: {
        formValuesChange(state, action) {
            state.userParams = { ...state.userParams, [action.payload.formName]: action.payload.updatedValue }
        },
    }
})

export const {
    formValuesChange } = simulationSlice.actions
export default simulationSlice.reducer