import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";

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

export const signWithGoogle = createAsyncThunk("auth/signWithGoogle", async () => {
    try {
        const { user } = await signInWithPopup(auth, provider);
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

export const signUp = createAsyncThunk("auth/signUp", async (input) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, input.email, input.password);
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
        builder.addCase(signWithGoogle.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
})
export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
