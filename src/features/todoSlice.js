import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todoArr: [],
    },
    reducers: {},
    extraReducers: () => {
        
    },
})

export default todoSlice.reducer;