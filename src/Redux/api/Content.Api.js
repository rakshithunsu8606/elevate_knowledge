import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const ContentApi = createApi({
    reducerPath: 'ContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllContent: build.query({
            query: () => 'content/getAllcontent',

            providesTags: ['Content']
        }),
        addContent: build.mutation({
            query: (data) => ({
                url: 'content/addcontent',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Content']
        }),
        updateContent: build.mutation({
            query: (data) => ({
                url: `content/updateContent/${data.get('_id')}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Content']
        }),
        deleteContent: build.mutation({
            query: (id) => ({
                url: `content/deletecontent/${id}`,
                method: 'DELETE',
                body: id
            }),

            invalidatesTags: ['Content']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddContentMutation, useDeleteContentMutation, useGetAllContentQuery, useUpdateContentMutation } = ContentApi