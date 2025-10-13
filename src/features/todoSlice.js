import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoArr: [],
        user: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {

    },
})

export default todoSlice.reducer;