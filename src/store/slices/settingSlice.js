import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        formName: null,
        formTitle: null,
        inputs: [],
    },

    reducers: {
        setSetting(state, action) {
            state.formTitle = action.payload.formTitle
            // state.inputs = action.payload.inputs
            state.formName = state.formName === action.payload.formName ? '' : action.payload.formName
            state.sceneMode = action.payload.sceneMode
        },

        resetSetting(state, action) {
            state.setting = null
            state.formTitle = null
            state.inputs = null
            state.formName = []
        },

        setFormValues(state, action) {
            state.inputs = { ...state.inputs, [action.payload.name]: { ...state.inputs[action.payload.name], value: action.payload.value } }
        }
    }
})

export const { setSetting, setFormValues, resetSetting } = settingSlice.actions;
export default settingSlice.reducer