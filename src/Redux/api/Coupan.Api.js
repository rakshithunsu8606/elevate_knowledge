import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const CoupanApi = createApi({
    reducerPath: 'CoupanApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllCoupan: build.query({
            query: () => 'coupan/getAllCoupan',

            providesTags: ['Coupan']
        }),
        addCoupan: build.mutation({
            query: (data) => ({
                url: 'coupan/addCoupan',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Coupan']
        }),
        updateCoupan: build.mutation({
            query: (data) => ({
                url: `coupan/updateCoupan/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Coupan']
        }),
        deleteCoupan: build.mutation({
            query: (id) => ({
                url: `coupan/deleteCoupan/${id}`,
                method: 'DELETE',
                body: id
            }),

            invalidatesTags: ['Coupan']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddCoupanMutation, useUpdateCoupanMutation, useDeleteCoupanMutation, useGetAllCoupanQuery } = CoupanApi

