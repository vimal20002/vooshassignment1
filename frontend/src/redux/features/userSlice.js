import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api'


// for login

export const loginThunk=createAsyncThunk("/login",async({formData, navigate, dispatch},{rejectWithValue})=>{
    try {
        const response=await api.login(formData);
        console.log(response.data.token);
        if(response.status === 200){
            dispatch(
                invokeAlert1({message:"Logged In SuccessFully", type:"ok"})
            )
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))

            navigate('/')
        }
        return response.data;
    } catch (error) {
        console.log(error);
        dispatch(
            invokeAlert1({message:error.response.data.message, type:"notok"})
        )
        return rejectWithValue(error.response?.data)
    }
})
//for registration
export const registerThunk=createAsyncThunk("/register",async({formData, navigate,dispatch},{rejectWithValue})=>{
    try {
        const response=await api.register(formData);
        console.log(response);
        if(response.status === 201)
        {
            dispatch(
                invokeAlert1({message:"Signed Up SuccessFully", type:"ok"})
            )
            navigate('/login')
        }
        return response.data;
    } catch (error) {
        console.log(error);
        dispatch(

            invokeAlert1({message:error.response.data.message, type:"notok"})
        )
        return rejectWithValue(error.response?.data)
    }
})
//for googlginthunk
export const googleThunk=createAsyncThunk("/google",async({formData, navigate,dispatch},{rejectWithValue})=>{
    try {
        const response=await api.continuwWithGoogleApi(formData);
        console.log(response);
        if(response.status === 201)
        {
            dispatch(
                invokeAlert1({message:"Signed Up SuccessFully", type:"ok"})
            )
            navigate('/login')
        }
        if(response.status === 200)
            {
                dispatch(
                    invokeAlert1({message:"Logged In SuccessFully", type:"ok"})
                )
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user",JSON.stringify(response.data.user))

                navigate('/')
            }
        return response.data;
    } catch (error) {
        console.log(error);
        dispatch(

            invokeAlert1({message:error.response.data.message, type:"notok"})
        )
        return rejectWithValue(error.response?.data)
    }
})
//resets the error value to null
export const resetErrorThunk = createAsyncThunk('user/resetError', async (_, { dispatch }) => {
    dispatch(userSlice.actions.resetError());
});

//resets the response from registration
export const resetRegThunk = createAsyncThunk('user/resetReg', async (_, { dispatch }) => {
    dispatch(userSlice.actions.resetReg());
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token:null,
        loading: false,
        alertMessage1:null,
        alertType1:null,
        error: null,
        registration:null
    },
    reducers: {
        //related reducers
        resetError: (state) => {
            state.error = null;
        },
        resetReg: (state) => {
            state.registration = null;
        },
        invokeAlert1(state, action){
            console.log(action.payload)
            state.alertMessage1=action.payload.message;
            state.alertType1=action.payload.type;
        },
        resetAlert1(state){
            state.alertMessage1=null;
            state.alertType1=null;
        },
        logout(state){
            console.log(state)
            state.user=null;
            state.token=null;
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }

    },
    extraReducers: (builder)=>{
        builder 
        // for login
        .addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;


        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // for registration
        .addCase(registerThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.registration = action.payload;
        })
        .addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(googleThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        //for google login
        .addCase(googleThunk.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.token!==null){
            state.token = action.payload.token;
            state.user = action.payload.user;
            }

        })
        .addCase(googleThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export const {invokeAlert1, resetAlert1, logout} = userSlice.actions;
export default userSlice.reducer;