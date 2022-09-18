import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from "../services/apiSlice";

const initialState = {}

export const hotBlogsSlice = createSlice({
    name: 'hot_blogs',
    initialState,
    extraReducers: builder => {
        builder.addMatcher(apiSlice.endpoints.getHotBlogs.matchFulfilled, (state, { payload }) => {
            return payload.data;
        });
    }
})

export default hotBlogsSlice.reducer