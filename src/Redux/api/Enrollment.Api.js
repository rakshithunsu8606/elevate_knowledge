import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const EnrollmentApi = createApi({
    reducerPath: 'EnrollmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllEnrollment: build.query({
            query: () => 'enrollment/getAllEnrollment',

            providesTags: ['Enrollment']
        }),
        addEnrollment: build.mutation({
            query: (data) => ({
                url: 'enrollment/addEnrollment',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Enrollment']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddEnrollmentMutation, useGetAllEnrollmentQuery } = EnrollmentApi
