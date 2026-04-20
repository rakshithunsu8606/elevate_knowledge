import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { data } from "react-router";
import { BASE_URL } from "../../../utility/url";
import axios from "axios";
import { axiosinstance } from "../../../utility/Intersapetore";

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const addCategory = createAsyncThunk(
    'Category/addCategory',
    async (values) => {
        console.log("addCategory", values);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category_img", values.category_img[0]);

        if (values.parent_category_id) {
            formData.append("parent_category_id", values.parent_category_id);
        }


        console.log("formData", formData);

        const response = await axiosinstance.post('category/addCategory', formData, {
            headers: { "Content-Type": "multipart/form-data" }

        });

        console.log(response);


        return response.data.data;
    },
)

export const getAllCategory = createAsyncThunk(
    'Category/getAllCategory',
    async (_, { rejectWithValue }) => {

        try {
            const response = await axiosinstance.get('category/getAllCategory');



            return response.data.data;
            // return []
        } catch (error) {
            // console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)

export const DeleteCategory = createAsyncThunk(
    'Category/DeleteCategory',
    async (id) => {
        console.log(id);

        try {
            const response = await axiosinstance.delete(`category/deleteCategory/${id}`)

            console.log(response);

            return id;
        } catch (error) {
            console.log(error);

        }
    }

)


export const UpdateCategory = createAsyncThunk(
    'Category/UpdateCategory',
    async (val) => {
        console.log("updateval", val);

        const formData = new FormData();
        formData.append("name", val.name);
        formData.append("description", val.description);
        formData.append("category_img", val.category_img[0]);

        console.log("UpformData", formData);

        try {
            const response = await axiosinstance.put(`category/updateCategory/${val._id}`, formData)
            // const response = await fetch(`${BASE_URL}category/updateCategory/${val._id}`, {
            //     method: "PUT",
            //     body: formData
            // });

            // const data = await response.json()

            // console.log(data);

            return response.data.data;
        } catch (error) {
            // console.log(error);
        }
    }
)


const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.category = action.payload
        })
        builder.addCase(getAllCategory.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.category = []
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            console.log(action.payload);

            state.category.push(action.payload)
        })
        builder.addCase(DeleteCategory.fulfilled, (state, action) => {
            state.category = state.category?.filter(v => v._id !== action.payload)
        })
        builder.addCase(UpdateCategory.fulfilled, (state, action) => {
            const index = state.category?.findIndex(v => v._id === action.payload._id)

            state.category[index] = action.payload

        })
    }
})

export default CategorySlice.reducer;