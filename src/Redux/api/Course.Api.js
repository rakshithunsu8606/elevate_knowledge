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
                console.log("data", data);
                let temp_id = crypto.randomUUID()

                const ImageData = data.getAll('course_img');

                const patchResult = dispatch(
                    dispatch(
                        CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                            console.log("draft.data", draft.data)
                            draft.data.push({
                                _id: temp_id,
                                name: data.get('name'),
                                description: data.get('description'),
                                category_id: data.get('category_id'),
                                price: data.get('price'),
                                week: data.get('week'),
                                instructure_id: data.get("instructure_id"),
                                course_img: ImageData?.map(v => ({
                                    url: URL.createObjectURL(v)
                                })),
                                // Preview_url: data.get('Preview_url')

                            })

                        }),
                    )
                )
                try {
                    const { data } = await queryFulfilled
                    console.log("data", data);

                    dispatch(
                        CourseApi.util.updateQueryData('getAllCourse', undefined, (draft) => {
                            console.log("draft.data", draft.data)

                            let index = draft.data.findIndex((v) => v._id === temp_id);
                            console.log(index);

                            draft.data[index] = data.data

                        }),
                    )

                } catch {
                    patchResult.undo()


                }
            },
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
                        console.log("draaaf", draft.data);

                        console.log("data", data);

                        const Img = data?.getAll('course_img')

                        console.log("Img", Img);

                        // Object.assign(draft, patch)

                        let x = [];

                        for (let v of Img) {
                            if (v instanceof File) {
                                // console.log("vvvvzzzz", v);
                                x.push({ url: URL.createObjectURL(v) });
                            } else {
                                console.log("vvvv", v);

                                x.push({ url: v });
                            }
                        }

                        console.log("wow", x);

                        const index = draft?.data?.findIndex(v => v._id === data?.get("_id"))

                        console.log(index);




                        if (index !== -1) {
                            console.log("draft.data");
                            draft.data[index] = {

                                _id: data.get("_id"),
                                category_id: data.get("category_id"),
                                name: data.get("name"),
                                description: data.get("description"),
                                price: data.get("price"),
                                week: data.get("week"),
                                instructure_id: data.get("instructure_id"),
                                course_img: x


                            }
                        }



                    }),
                )
                try {
                    await queryFulfilled
                } catch (err) {
                    console.error("err", err);

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
                        const index = draft?.data?.findIndex(v => v._id === id)

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