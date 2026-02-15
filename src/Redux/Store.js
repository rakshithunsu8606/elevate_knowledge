import { configureStore } from '@reduxjs/toolkit'
import CategorySlice from './Slice/CategorySlice'
import SubCategory_Slice from './Slice/SubCategory_Slice'
// import CategoryDisplaySlice from './Slice/CategoryDisplaySlice'


export const Confstore = () => {
    const store = configureStore({
        reducer: {
            Category:CategorySlice,
            SubCategory:SubCategory_Slice,
        }
    })

    return store
}