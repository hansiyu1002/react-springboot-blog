import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from "../services/apiSlice";

const initialState = {}

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    extraReducers: builder => {
        builder.addMatcher(apiSlice.endpoints.getMyBlogs.matchFulfilled, (state, { payload }) => {
            return payload;
        });
        builder.addMatcher(apiSlice.endpoints.logoutUser.matchFulfilled, () => {
            return {};
        });
    }
})

export default blogsSlice.reducer