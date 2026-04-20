import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const QuizApi = createApi({
    reducerPath: 'QuizApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllQuiz: build.query({
            query: () => 'quiz/getAllQuiz',

            providesTags: ['Quiz']
        }),
        addQuiz: build.mutation({
            query: (data) => ({
                url: 'quiz/addQuiz',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Quiz']
        }),
        updateQuiz: build.mutation({
            query: (data) => ({
                url: `quiz/updateQuiz/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Quiz']
        }),
        deleteQuiz: build.mutation({
            query: (id) => ({
                url: `quiz/deleteQuiz/${id}`,
                method: 'DELETE',
                body: id
            }),
           
            invalidatesTags: ['Quiz']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddQuizMutation, useUpdateQuizMutation, useDeleteQuizMutation, useGetAllQuizQuery } = QuizApi