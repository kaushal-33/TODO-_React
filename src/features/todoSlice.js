import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const addTodo = createAsyncThunk("todo/addTodo", async ({ input, uId }) => {
    try {
        const res = await addDoc(collection(db, uId), { ...input, createdAt: new Date(), status: "pending" });
        console.log(res)
    } catch (error) {
        console.log(error)
    }
})

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoArr: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {

    },
})

export default todoSlice.reducer;