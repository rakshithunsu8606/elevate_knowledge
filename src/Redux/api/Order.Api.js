import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const OrderApi = createApi({
    reducerPath: 'OrderApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllOrder: build.query({
            query: () => 'order/getAllOrder',

            providesTags: ['Order']
        }),
        addOrder: build.mutation({
            query: (data) => ({
                url: 'order/addOrder',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Order']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddOrderMutation, useGetAllOrderQuery } = OrderApi

