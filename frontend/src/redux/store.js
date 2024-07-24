
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import todoSlice from "./features/todoSlice";


export default configureStore({
    reducer:{
        user: userSlice,
        todos: todoSlice,
    }
})