import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    text: '',
    variant: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.text = action.payload.text
            state.variant = action.payload.variant
        },
        resetALert: (state, action) => {
            state.text = ''
            state.variant = ''
        }

    }
})

export const { setAlert, resetALert } = alertSlice.actions
export default alertSlice.reducer