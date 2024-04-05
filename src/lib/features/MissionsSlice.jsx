import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: [
        
  ]
}
export const CartSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    addCart: (state, action) => {

      const itemPresent = state.value.find((item) => item.name === action.payload.name)
      if (itemPresent) {
        itemPresent.quantity = action.payload.quantity;
        itemPresent.total = itemPresent.quantity*itemPresent.bounty
      } else {
        state.value.push({...action.payload})
      }
    },
    deleteCart: (state, action) => {
      state.value.splice(action.payload, 1)
    },
    checkOut: (state) => {
      state.value.splice(0)
    },
    plusUn: (state, action) => {
      state.value[action.payload].quantity += 1
      state.value[action.payload].total = state.value[action.payload].bounty*state.value[action.payload].quantity
    },
    moinsUn: (state, action) => {
      if (state.value[action.payload].quantity === 0) {
        state.value[action.payload].quantity = 0
      } else {
        state.value[action.payload].quantity -= 1
        state.value[action.payload].total = state.value[action.payload].bounty*state.value[action.payload].quantity
      }
    }
    },
  },
)

export const { addCart, deleteCart, checkOut, plusUn, moinsUn } = CartSlice.actions

export default CartSlice.reducer