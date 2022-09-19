import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().account.token;
            if(token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        }
    }),
    keepUnusedDataFor: 30,
    tagTypes: ['my_blogs', 'hot_blogs'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['my_blogs']
        }),
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['my_blogs']
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            }),
            invalidatesTags: ['Blogs']
        }),
        getHotBlogs: builder.query({
            query: () => ({
                url: '/article/hot'
            }),
            providesTags: ['hot_blogs']
        }),
        getMyBlogs: builder.query({
            query: () => ({
                url: '/article/mine'
            }),
            providesTags: ['my_blogs']
        }),
        createBlog: builder.mutation({
            query: (blog) => ({
                url: '/article/post',
                method: 'POST',
                body: blog
            }),
            invalidatesTags: ['my_blogs', 'hot_blogs']
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/article/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['my_blogs', 'hot_blogs']
        }),
        updateBlog: builder.mutation({
            query: ({id, title, content}) => ({
                url: `/article/${id}`,
                method: 'PATCH',
                body: {title, content}
            }),
            invalidatesTags: ['my_blogs', 'hot_blogs']
        }),
        incrViewCount: builder.mutation({
            query: (id) => ({
                url: `/article/view_count/${id}`,
                method: 'PATCH',
                body: {id}
            }),
            invalidatesTags: ['my_blogs', 'hot_blogs']
        })
    })
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useLogoutUserMutation,
    useGetHotBlogsQuery,
    useGetMyBlogsQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
    useIncrViewCountMutation } = apiSlice;