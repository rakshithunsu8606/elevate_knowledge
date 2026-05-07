import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const CartApi = createApi({
    reducerPath: 'CartApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllCart: build.query({
            query: () => 'cart/getAllCart',

            providesTags: ['Cart']
        }),
        addCart: build.mutation({
            query: (data) => ({
                url: 'cart/addCart',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Cart']
        }),
        updateCart: build.mutation({
            query: (data) => ({
                url: `cart/updateCart/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Cart']
        }),
        deleteCart: build.mutation({
            query: (id) => ({
                url: `cart/deleteCart/${id}`,
                method: 'DELETE',
                body: id
            }),
           
            invalidatesTags: ['Cart']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddCartMutation, useUpdateCartMutation, useDeleteCartMutation, useGetAllCartQuery } = CartApi