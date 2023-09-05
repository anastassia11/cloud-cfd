import { createSlice } from '@reduxjs/toolkit'
import formDefault from '@/components/tree-panel/assets/formData.json'

const paramsSlice = createSlice({
    name: 'params',
    initialState: {
        params: formDefault,
    },

    reducers: {
        setUserValue(state, action) {
            state.params = { ...state.params, [action.payload.formName]: action.payload.updatedValue }
        }
    }
})

export const { setUserValue } = paramsSlice.actions;
export default paramsSlice.reducer