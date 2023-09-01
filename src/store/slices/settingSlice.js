import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        setting: null,
        formName: null,
        formTitle: null,
        inputs: []
    },

    reducers: {
        selectSetting(state, action) {
            state.setting = state.setting === action.payload.formName ? null : action.payload.formName

        },
        setSetting(state, action) {
            state.setting = state.setting === action.payload.formName ? null : action.payload.formName
            state.formTitle = action.payload.formTitle
            state.inputs = action.payload.inputs
            state.formName = action.payload.formName
        },
        setFormValues(state, action) {
            state.inputs = { ...state.inputs, [action.payload.name]: { ...state.inputs[action.payload.name], value: action.payload.value } }
        }
    }
})

export const { setSetting, setFormValues, selectSetting } = settingSlice.actions;
export default settingSlice.reducer