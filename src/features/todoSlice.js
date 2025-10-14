import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, } from "firebase/firestore";
import { db } from "../config/firebase";

export const addTodo = createAsyncThunk("todo/addTodo", async ({ input, uId }) => {
    try {
        const res = await addDoc(collection(db, uId), { ...input, status: 0 });
        return {
            id: res.id,
            ...input,
        }
    } catch (error) {
        console.log(error)
    }
})

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async (uId) => {
    try {
        const { docs } = await getDocs(collection(db, uId));
        const data = docs.map((task) => {
            return {
                id: task.id,
                ...task.data(),
            }
        })
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async ({ uId, deleteId }) => {
    try {
        await deleteDoc(doc(db, uId, deleteId));
    } catch (error) {
        console.log(error)
    }
    return deleteId;
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async ({ uId, updateId, input }) => {
    try {
        const res = await updateDoc(doc(db, uId, updateId), input);
    } catch (error) {
        console.log(error)
    }
    return {
        id: updateId,
        ...input
    };
})

export const completeTodo = createAsyncThunk("todo/completeTodo", async ({ uId, updateId }) => {
    try {
        await updateDoc(doc(db, uId, updateId), { status: 1 });
    } catch (error) {
        console.log(error);
    }
    return updateId;
})

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoArr: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.todoArr.push({ ...action.payload, status: 0 });
        })
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.todoArr = action.payload;
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            let filteredArr = state.todoArr.filter((task) => task.id !== action.payload)
            state.todoArr = filteredArr;
        })
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            let idx = state.todoArr.findIndex((task) => task.id === action.payload.id);
            if (idx !== -1) {
                state.todoArr[idx] = action.payload;
            }
        })
        builder.addCase(completeTodo.fulfilled, (state, action) => {
            let idx = state.todoArr.findIndex((task) => task.id === action.payload);
            if (idx !== -1) {
                state.todoArr[idx] = { ...state.todoArr[idx], status: 1 };
            }
        })
    },
})
export const { setEditIdx } = todoSlice.actions;
export default todoSlice.reducer;