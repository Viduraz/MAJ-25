import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/User/userSlice';

export const store = configureStore({
    reducer: { user: userReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})