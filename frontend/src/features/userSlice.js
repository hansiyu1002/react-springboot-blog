import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';

const initialState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(apiSlice.endpoints.signupUser.matchFulfilled, (state, { payload }) => {
            return payload;
        });
        builder.addMatcher(apiSlice.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            return payload;
        });
        builder.addMatcher(apiSlice.endpoints.logoutUser.matchFulfilled, (state) => {
            return {};
        });
    }
})

export default userSlice.reducer