import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { data } from "react-router"

const initialState = {
    user: {},
    auth: false
}

export const Registration = createAsyncThunk(
    'auth/Registration',
    async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/registration', data)

            console.log(response);
        } catch (error) {
            console.log(error);
            
        }

    },
)

const RegistrationSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {

    }
})