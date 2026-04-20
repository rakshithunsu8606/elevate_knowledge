import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const SectionApi = createApi({
    reducerPath: 'SectionApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllSection: build.query({
            query: () => 'section/getAllSection',

            providesTags: ['Section']
        }),
        addSection: build.mutation({
            query: (data) => ({
                url: 'section/addSection',
                method: 'POST',
                body: data
            }),

            // async onQueryStarted(data, { dispatch, queryFulfilled }) {
            //     const tempid = crypto.randomUUID();

            //     const patchResult = dispatch(
            //         SectionApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
            //             // Object.assign(draft, patch)
            //             draft.data.push({ ...data, _id: tempid })

            //             console.log("draft.data", draft.data);

            //         }),
            //     )
            //     try {
            //         // await queryFulfilled
            //         const { data } = await queryFulfilled

            //         console.log("data", data);

            //         dispatch(
            //             CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
            //                 // Object.assign(draft, patch)
            //                 const index = draft.data.findIndex((v) => v._id === tempid)

            //                 console.log(index);

            //                 draft.data[index] = data.data

            //             }),
            //         )

            //     } catch {
            //         patchResult.undo()

            //         /**
            //          * Alternatively, on failure you can invalidate the corresponding cache tags
            //          * to trigger a re-fetch:
            //          * dispatch(api.util.invalidateTags(['Post']))
            //          */
            //     }
            // }
            invalidatesTags: ['Section']
        }),
        updateSection: build.mutation({
            query: (data) => ({
                url: `section/updatesection/${data._id}`,
                method: 'PUT',
                body: data
            }),

            invalidatesTags: ['Section']
        }),
        deleteSection: build.mutation({
            query: (id) => ({
                url: `section/deletesection/${id}`,
                method: 'DELETE',
                body: id
            }),
            // async onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     const patchResult = dispatch(
            //         CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
            //             // Object.assign(draft, patch)
            //             const index = draft?.data?.findIndex(v => v._id === id)

            //             console.log(index);

            //             if (index !== -1) {
            //                 draft.data.splice(index, 1)
            //             }

            //         }),
            //     )
            //     try {
            //         await queryFulfilled
            //     } catch {
            //         patchResult.undo()

            //         /**
            //          * Alternatively, on failure you can invalidate the corresponding cache tags
            //          * to trigger a re-fetch:
            //          * dispatch(api.util.invalidateTags(['Post']))
            //          */
            //     }
            // }
            invalidatesTags: ['Section']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddSectionMutation, useUpdateSectionMutation, useDeleteSectionMutation, useGetAllSectionQuery } = SectionApi