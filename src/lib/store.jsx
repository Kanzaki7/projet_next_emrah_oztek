import { configureStore } from '@reduxjs/toolkit';
import MissionsSlice from './features/MissionsSlice';
import TotalSlice from './features/TotalSlice';
import FavoriteSlice from './features/FavoriteSlice';
import AuthSlice from './features/AuthSlice';
import themeSlice from './features/themeSlice';
import BurgerSlice from './features/BurgerSlice';


const store = configureStore({
	reducer: {
        missions: MissionsSlice,
        total: TotalSlice,
        favorite: FavoriteSlice,
        auth: AuthSlice,
        theme: themeSlice,
        burger: BurgerSlice,
    } 
})

export default store;