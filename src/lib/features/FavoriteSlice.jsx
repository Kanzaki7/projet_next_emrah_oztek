import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: [],
  star: "star",
}
export const FavoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const itemPresent = state.value.find((item) => item.name === action.payload.name)
      if (itemPresent) {
        itemPresent.favorite = false;
        state.value.splice(state.value.indexOf(itemPresent), 1)
        state.star = "star" 
      } else {
        // state.value.favorite = true
        state.value.push({...action.payload})
        state.star = "starOn"
      }
    },
    deleteFavorite: (state, action) => {
        // state.value.splice(action.payload, 1)
        state.value.favorite = action.payload.favorite
    }
    },
  },
)

export const { addFavorite, deleteFavorite } = FavoriteSlice.actions

export default FavoriteSlice.reducer