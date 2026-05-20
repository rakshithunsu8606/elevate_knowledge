import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from './Slice/CategorySlice'
import SubCategory_Slice from './Slice/SubCategory_Slice'
import authSlice from './Slice/auth'
import alertSlice from './Slice/alert.Slice'
import { CourseApi } from './api/Course.Api'
import { SectionApi } from './api/Section.Api'
import { QuizApi } from './api/Quiz.Api'
import { QuizContentApi } from './api/QuizContent.Api'
import { ContentApi } from './api/Content.Api'
import { CartApi } from './api/Cart.Api'
import { CoupanApi } from './api/Coupan.Api'
import { OrderApi } from './api/Order.Api'
import { PaymentApi } from './api/Payment.Api'
import { EnrollmentApi } from './api/Enrollment.APi'

// import CategoryDisplaySlice from './Slice/CategoryDisplaySlice'


export const Confstore = () => {
    const store = configureStore({
        reducer: {
            Category: CategorySlice,
            SubCategory: SubCategory_Slice,
            Auth: authSlice,
            alert: alertSlice,
            [CourseApi.reducerPath]: CourseApi.reducer,
            [SectionApi.reducerPath]: SectionApi.reducer,
            [QuizApi.reducerPath]:QuizApi.reducer,
            [QuizContentApi.reducerPath]:QuizContentApi.reducer,
            [ContentApi.reducerPath]:ContentApi.reducer,
            [CartApi.reducerPath]:CartApi.reducer,
            [CoupanApi.reducerPath]:CoupanApi.reducer,
            [OrderApi.reducerPath]:OrderApi.reducer,
            [PaymentApi.reducerPath]:PaymentApi.reducer,
            [EnrollmentApi.reducerPath]:EnrollmentApi.reducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([CourseApi.middleware, 
                                        SectionApi.middleware, 
                                        QuizApi.middleware, 
                                        QuizContentApi.middleware,
                                        ContentApi.middleware,
                                        CartApi.middleware,
                                        CoupanApi.middleware,
                                        OrderApi.middleware,
                                        PaymentApi.middleware,
                                        EnrollmentApi.middleware
                                    ]),
    })

    return store
}