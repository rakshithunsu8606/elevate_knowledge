import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { axiosinstance } from "../../../utility/Intersapetore"
import { setAlert } from "./alert.Slice"
// import { data } from "react-router"
// import axiosinstance from "../../../utility/Intersapetore"

const initialState = {
    isLoading: false,
    user: null,
    error: null
}

export const Registration = createAsyncThunk(
    'auth/Registration',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.post(
                'user/registration',
                data
            )

            console.log(response);


            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);

            dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.post(
                'user/verifyUser',
                data
            )

            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);

            dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const LoginyUser = createAsyncThunk(
    'auth/LoginyUser',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.post(
                'user/login',
                data
            )

            console.log(response);

            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);

            console.log(error.response.data.message);

            dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const LogoutUser = createAsyncThunk(
    'auth/LogoutUser',
    async (_id, { dispatch }) => {
        console.log("id:", _id);

        try {
            const response = await axiosinstance.post(
                'user/logOut',
                { _id }
            )

            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

export const CheakAuthUser = createAsyncThunk(
    'auth/CheakAuthUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.get(
                'user/cheakAuth',

            )

            console.log(response);

            return response.data.data
        } catch (error) {
            console.log(error);

            // dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const ForgotePass = createAsyncThunk(
    'auth/ForgotePass',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.post(
                'user/forgote',
                data
            )

            console.log(response);


            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);

            dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const ResetPass = createAsyncThunk(
    'auth/ResetPass',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            const response = await axiosinstance.post(
                'user/resetPass',
                data
            )

            console.log(response);


            if (response.data.sucess) {
                dispatch(setAlert({ text: response.data.meassage, variant: 'success' }))
                return response.data.data
            }

            return response.data
        } catch (error) {
            console.log(error);

            dispatch(setAlert({ text: error.response.data.message, variant: 'error' }))
            return rejectWithValue(error.response.data.message)
        }
    }
)



const auth = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(ResetPass.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = null
        })
        builder.addCase(ForgotePass.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = null
        })
        builder.addCase(CheakAuthUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = null
        })
        builder.addCase(CheakAuthUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = action.payload
        })
        builder.addCase(LoginyUser.pending, (state, action) => {
            state.isLoading = true
            state.user = null
            state.error = null
        })
        builder.addCase(Registration.rejected, (state, action) => {
            console.log(action.payload);

            state.isLoading = false
            state.user = null
            state.error = action.payload
        })
        builder.addCase(verifyUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = action.payload
        })
        builder.addCase(LoginyUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            state.error = null
        })
        builder.addCase(LoginyUser.rejected, (state, action) => {
            console.log(action.payload);

            state.isLoading = false
            state.user = null
            state.error = action.payload
        })
        builder.addCase(LogoutUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = null
            state.error = null
        })
    }
})

export default auth.reducer;