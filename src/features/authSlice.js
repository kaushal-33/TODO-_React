import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const signIn = createAsyncThunk("auth/signIn", async (input) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, input.email, input.password);
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        };
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: "authUser",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logOut: (state) => {
            try {
                signOut(auth);
                state.user = null;
            } catch (error) {
                console.log(error)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
