import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const QuizContentApi = createApi({
    reducerPath: 'QuizContentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllQuizContent: build.query({
            query: () => 'quiz_content/getAllQuiz_Content',

            providesTags: ['QuizContent']
        }),
        addQuizContent: build.mutation({
            query: (data) => ({
                url: 'quiz_content/addQuiz_Content',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['QuizContent']
        }),
        updateQuizContent: build.mutation({
            query: (data) => ({
                url: `quiz_content/updateQuiz_Content${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['QuizContent']
        }),
        deleteQuizContent: build.mutation({
            query: (id) => ({
                url: `quiz_content/deleteQuiz_Content/${id}`,
                method: 'DELETE',
                body: id
            }),
           
            invalidatesTags: ['QuizContent']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddQuizContentMutation, useDeleteQuizContentMutation, useGetAllQuizContentQuery, useUpdateQuizContentMutation } = QuizContentApi