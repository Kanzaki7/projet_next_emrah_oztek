import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}
export const totalSlice = createSlice({
    name: "total",
    initialState,
    reducers: {
        addTotal: (state, action) => {
            state.value = state.value + action.payload
        },
        subTotal: (state, action) => {
            state.value = state.value - action.payload
        },
        removeTotal: (state) => {
            state.value = 0
        }
    }
})

export const { addTotal, subTotal, removeTotal } = totalSlice.actions
export default totalSlice.reducer; 