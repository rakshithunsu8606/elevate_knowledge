import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'

export const CourseApi = createApi({
    reducerPath: 'CourseApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllCourse: build.query({
            query: () => '/course/getAllCourse',

            providesTags: ['Course']
        }),
        addCourse: build.mutation({
            query: (data) => ({
                url: '/course/addCourse',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const tempid = crypto.randomUUID();
                const patchResult = dispatch(
                    CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                        // Object.assign(draft, patch)
                        draft.data.push({ ...data, _id: tempid })

                        console.log("draft.data", draft.data);

                    }),
                )
                try {
                    // await queryFulfilled
                    const { data } = await queryFulfilled

                    console.log("data", data);

                    dispatch(
                        CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                            // Object.assign(draft, patch)
                            const index = draft.data.findIndex((v) => v._id === tempid)

                            console.log(index);

                            draft.data[index] = data.data

                        }),
                    )

                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            }
            // invalidatesTags: ['Course']
        }),
        updateCourse: build.mutation({
            // const tempimg=data,
            query: (data) => ({
                url: `/course/updateCourse/${data.get("_id")}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                        console.log(draft.data);

                        // Object.assign(draft, patch)
                        const index = draft.data.findIndex(v => v._id === data.get("_id"))

                        console.log(index);

                        if (index !== -1) {
                            draft.data[index] = {
                                _id: data.get("_id"),
                                category_id: data.get("category_id"),
                                name: data.get("name"),
                                description: data.get("description"),
                                course_img: typeof data.get("course_img") === "string" ? data.get("course_img") : URL.createObjectURL(data.get("course_img"))
                            }
                        }

                        console.log("draft.data", draft.data);

                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            }
            // invalidatesTags: ['Course']
        }),
        deleteCourse: build.mutation({
            query: (id) => ({
                url: `/course/deleteCourse/${id}`,
                method: 'DELETE',
                body: id
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                        // Object.assign(draft, patch)
                        const index = draft.data.findIndex(v => v._id === id)

                        console.log(index);

                        if (index !== -1) {
                            draft.data.splice(index, 1)
                        }

                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            }
            // invalidatesTags: ['Course']
        }),
        activeCourse: build.mutation({
            query: (data) => ({
                url: `course/activeCourse/${data._id}`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                        console.log(draft.data);

                        // Object.assign(draft, patch)
                        const index = draft.data.findIndex(v => v._id === data._id)

                        console.log(index);

                        if (index !== -1) {
                            draft.data[index] = data
                        }

                        console.log("draft.data", draft.data);

                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()

                    /**
                     * Alternatively, on failure you can invalidate the corresponding cache tags
                     * to trigger a re-fetch:
                     * dispatch(api.util.invalidateTags(['Post']))
                     */
                }
            },
            // invalidatesTags:['course']
        }),
    })
})

export const { useGetAllCourseQuery, useAddCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation, useActiveCourseMutation } = CourseApi