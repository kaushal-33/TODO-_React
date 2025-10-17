import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import toast from "react-hot-toast";

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
        console.log(error.code);
        if (error.code == "auth/invalid-credential") {
            toast.error("Invalid Email or Password...!");
        }
        throw error;
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
        console.log(error.code);
        throw error;
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
        console.log(error.code);
        if (error.code == "auth/email-already-in-use") {
            toast.error("Email is already in use...!");
        }
        if (error.code == "auth/weak-password") {
            toast.error("Password should be atleast 6 characters...!");
        }
        throw error;
    }
})

export const authSlice = createSlice({
    name: "authUser",
    initialState: {
        user: null,
        isLoading: false,
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
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })
        builder.addCase(signIn.pending, (state, action) => {
            state.isLoading = true;;
        })
        builder.addCase(signWithGoogle.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })
         builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
        })
    }
})
export const { setUser, logOut, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
