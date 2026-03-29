// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios";

// const initialState = {
//     isLoading: false,
//     SubCategory: [],
//     error: null
// }

// export const addSubCategory = createAsyncThunk(
//     'SubCategory/addSubCategory',
//     async (data) => {
//         const response = await axios.post("http://localhost:3000/SubCategory", data)

//         console.log(response.data);

//         return response.data

//     }
// )

// export const getSubCategory = createAsyncThunk(
//     'SubCategory/getSubCategory',
//     async () => {
//         const response = await axios.get("http://localhost:3000/SubCategory")

//         console.log(response.data);

//         return response.data
//     }
// )

// export const DeleteSubCategory = createAsyncThunk(
//     'SubCategory/DeleteSubCategory',
//     async (id) => {
//         const response = await axios.delete(`http://localhost:3000/SubCategory/${id}`)

//         console.log(response.data);

//         return response.data.id
//     }
// )

// export const EditSubCategory = createAsyncThunk(
//     'SubCategory/EditSubCategory',
//     async (data) => {
//         const response = await axios.put(`http://localhost:3000/SubCategory/${data.id}`,data)

//         console.log(response.data);

//         return data
//     }
// )


// const SubCategorySlice = createSlice({  
//     name: 'SubCategory',
//     initialState,
//     extraReducers: (builder) => {
//         builder.addCase(addSubCategory.fulfilled, (state, action) => {
//             state.SubCategory.push(action.payload)
//         })
//         builder.addCase(getSubCategory.fulfilled, (state, action) => {
//             state.SubCategory = action.payload
//         })
//         builder.addCase(DeleteSubCategory.fulfilled, (state, action) => {
//             state.SubCategory = state.SubCategory.filter(v => v.id !== action.payload)
//         })
//         builder.addCase(EditSubCategory.fulfilled, (state, action) => {
//             const index = state.SubCategory.findIndex(v => v.id === action.payload.id)

//             console.log(index);
            
//             state.SubCategory[index] = action.payload
//         })


//     }   
// })

// export default SubCategorySlice.reducer;