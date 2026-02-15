import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { data } from "react-router";
import { BASE_URL } from "../../../utility/url";

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
        formData.append("category_img", values.category_img);

        console.log("formData", formData);

        const response = await fetch(BASE_URL + 'category/addCategory', {
            method: "POST",
            body: formData,

        });

        const dataR = await response.json()

        console.log(dataR);

        return dataR.data;
    },
)

export const getAllCategory = createAsyncThunk(
    'Category/getAllCategory',
    async () => {

        try {
            // const response = await fetch(BASE_URL + 'category/getAllCategory');

            // const data = await response.json();

            // console.log(data);

            // return data.data;
            return []
        } catch (error) {
            console.log(error);

        }
    }
)

export const DeleteCategory = createAsyncThunk(
    'Category/DeleteCategory',
    async (id) => {
        console.log(id);

        try {
            const response = await fetch(`${BASE_URL}category/deleteCategory/${id}`, {
                method: "DELETE"
            })

            const rdata = await response.json();

            console.log(rdata);


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
        formData.append("category_img", val.category_img);

        console.log("UpformData", formData);

        try {
            const response = await fetch(`${BASE_URL}category/updateCategory/${val._id}`, {
                method: "PUT",
                body: formData
            });

            const data = await response.json()

            console.log(data);

            return data.data;
        } catch (error) {
            // console.log(error);
        }
    }
)


const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.category = action.payload
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
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