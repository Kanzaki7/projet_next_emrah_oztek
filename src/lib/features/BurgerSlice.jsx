import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}
export const burgerSlice = createSlice({
    name: "burger",
    initialState,
    reducers: {
        burgerActive: (state) => {
            state.value = state.value === false ? true : false
        },
    }
})

export const { burgerActive } = burgerSlice.actions
export default burgerSlice.reducer; 