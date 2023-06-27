import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null
    },
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer