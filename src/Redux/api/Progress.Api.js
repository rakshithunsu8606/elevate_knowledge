import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const ProgressApi = createApi({
    reducerPath: 'ProgressApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllProgress: build.query({
            query: () => 'progress/getAllProgress',

            providesTags: ['Progress']
        }),
        addProgress: build.mutation({
            query: (data) => ({
                url: 'progress/addProgress',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Progress']
        }),
        updateProgress: build.mutation({
            query: (data) => ({
                url: `/progress/updateProgress/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Progress']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddProgressMutation, useGetAllProgressQuery, useUpdateProgressMutation } = ProgressApi
