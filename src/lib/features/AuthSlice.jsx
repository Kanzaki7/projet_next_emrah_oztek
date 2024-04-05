import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  value: [],
  connexion: false
}
export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {

      const itemPresent = state.value.find((item) => item.name === action.payload.name)
      if (itemPresent) {

      } else {
        state.value.push({...action.payload})
    }
    },
    trueUser: (state) => {
        state.connexion = true
    },
    falseUser: (state) => {
        state.connexion = false
    },
    deleteUser: (state, action) => {
      state.value.splice(action.payload, 1)
    }
  },
})

export const { addUser, trueUser, falseUser, deleteUser } = AuthSlice.actions

export default AuthSlice.reducer