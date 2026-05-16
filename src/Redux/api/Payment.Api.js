import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'

// Define a service using a base URL and expected endpoints
export const PaymentApi = createApi({
    reducerPath: 'PaymentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['payment'],
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: (data) => ({
                url: 'payment/create-order',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Payment']
        }),
        verifyPayment: build.mutation({
            query: (data) => ({
                url: 'payment/verifyPayment',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Payment']
        })
    })
})


export const { useCreateOrderMutation,useVerifyPaymentMutation } = PaymentApi;