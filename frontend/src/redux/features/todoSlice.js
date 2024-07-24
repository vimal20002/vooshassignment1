import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api'

//gets you all the todos
export const getTodoThunk=createAsyncThunk("/getTodo", async({formData},{rejectWithValue})=>{
     try {
        console.log("started fetching blogs");
        const response= await api.getTodoApi(formData);
        console.log(response.data);
        return response.data;

     } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data)
     }
})

//adds a new to do
export const addTodoThunk=createAsyncThunk("/addTodo", async({formData, onClose, dispatch},{rejectWithValue})=>{
    try {
       const response= await api.addTodoApi(formData);
       if(response.status===201){
        dispatch(invokeAlert2({message:"Todo Added !", type:"ok"}))
        onClose();
       }
       return formData;
    } catch (error) {
        dispatch(invokeAlert2({message:error.response?.data?.message, type:"notok"}))
       console.log(error);
       return rejectWithValue(error.response?.data)
    }
})

//gets all todos
export const getAllTodosThunk=createAsyncThunk("/getalltodos", async({dispatch},{rejectWithValue})=>{
    try {
       const response= await api.getTodosApi();
       localStorage.setItem('todos',JSON.stringify(response.data))
       console.log(response.data)
       return response.data;
    } catch (error) {
        dispatch(invokeAlert2({message:error.response?.data?.message, type:"notok"}))
       console.log(error);
       return rejectWithValue(error.response?.data)
    }
})

//updates the todos
export const updateTodoThunk=createAsyncThunk("/updatetodo", async({formData,navigate,dispatch},{rejectWithValue})=>{
    try {
       const response= await api.updateTodoApi(formData);
       if(response.status===204 && !(formData?.status))
       {
        dispatch(invokeAlert2({message:"Todo Upadated !", type:"ok"}))
        navigate('/')
       }
       return response.data;
    } catch (error) {
        dispatch(invokeAlert2({message:error.response?.data?.message, type:"notok"}))
       console.log(error);
       return rejectWithValue(error.response?.data)
    }
})

//deletes a todo
export const deleteTodoThunk=createAsyncThunk("/deletetodo", async({formData,dispatch},{rejectWithValue})=>{
    try {
       const response= await api.deleteTodoApi(formData);
       if(response.status===200)
       {
        dispatch(invokeAlert2({message:"Todo Deleted!", type:"notok"}))
       }
       return {todoId : formData?.todoId};
    } catch (error) {
        dispatch(invokeAlert2({message:error.response?.data?.message, type:"notok"}))
       console.log(error);
       return rejectWithValue(error.response?.data)
    }
})


const todoSlice=createSlice({
    name:'todos',
    initialState:{
       todos:[],
       todo:null,
       loading:false,
       alertMessage2:null,
       alertType2:null,
       error:null,
       blogCreationResponse:null
    },
    reducers:{
        invokeAlert2:(state, action)=>{
            state.alertMessage2=action.payload.message;
            state.alertType2=action.payload.type;
        },
        resetAlert2(state){
            state.alertMessage2=null;
            state.alertType2=null;
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getTodoThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getTodoThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.todo = action.payload;
        })
        .addCase(getTodoThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addTodoThunk.pending, (state) => {
            state.error = '';
        })
        .addCase(addTodoThunk.fulfilled, (state, action) => {
            state.todos.push(action.payload);
        })
        .addCase(addTodoThunk.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(deleteTodoThunk.pending, (state) => {
            state.error = '';
        })
        .addCase(deleteTodoThunk.fulfilled, (state, action) => {
            state.loading=false;
        })
        .addCase(deleteTodoThunk.rejected, (state, action) => {
            state.error = action.payload;
        })
        .addCase(getAllTodosThunk.pending, (state) => {
            state.error = '';
        })
        .addCase(getAllTodosThunk.fulfilled, (state, action) => {
            state.todos = action.payload;
        })
        .addCase(getAllTodosThunk.rejected, (state, action) => {
            state.error = action.payload;
        })
        
    }
})
export const {invokeAlert2, resetAlert2} = todoSlice.actions
export default todoSlice.reducer;