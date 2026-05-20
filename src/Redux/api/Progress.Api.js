import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../../utility/url'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const ProgressApi = createApi({
    reducerPath: 'ProgressApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getAllProgress: build.query({
            query: () => 'progress/getAllProgress',

            providesTags: ['Progress']
        }),
        addProgress: build.mutation({
            query: (data) => ({
                url: 'progress/addProgress',
                method: 'POST',
                body: data
            }),

            invalidatesTags: ['Progress']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddProgressMutation, useGetAllProgressQuery } = ProgressApi

// const [addProgress] = useAddProgressMutation();

// const onTimeUpdate = async (e, id) => {

//     const currentVideoTime = Math.floor(e.target.currentTime);
//     const duration = Math.floor(e.target.duration);

//     setvideoTotalDuration((prev) => ({
//         ...prev,
//         [id]: duration
//     }));

//     setCurrentTime((prev) => ({
//         ...prev,
//         [id]: currentVideoTime
//     }));


//     // every 10 sec save
//     if (currentVideoTime % 10 === 0) {

//         await addProgress({

//             enrollment_id,
//             content_id: id,
//             content_time: currentVideoTime,
//             is_completed: currentVideoTime >= duration - 1

//         });

//     }
// };