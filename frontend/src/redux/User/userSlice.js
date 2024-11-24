import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        signInFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
        },
        deleteUserFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        signOut: (state) => {
            state.currentUser = null;
        },
    },
});

// Export the actions
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
} = userSlices.actions;

// Export the reducer
export default userSlices.reducer;