import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from './Slice/CategorySlice'
// import SubCategory_Slice from './Slice/SubCategory_Slice'
import authSlice from './Slice/auth'
import alertSlice from './Slice/alert.Slice'
import { CourseApi } from './api/Course.Api'

// import CategoryDisplaySlice from './Slice/CategoryDisplaySlice'


export const Confstore = () => {
    const store = configureStore({
        reducer: {
            Category: CategorySlice,
            // SubCategory: SubCategory_Slice,
            Auth: authSlice,
            alert: alertSlice,
            [CourseApi.reducerPath]: CourseApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(CourseApi.middleware),
    })

    return store
}