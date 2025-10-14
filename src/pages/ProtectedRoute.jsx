import { useEffect, useState } from 'react'
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';

const ProtectedRoute = ({ Component }) => {
    const { user } = useSelector(state => state.authUser)
    const dispatch = useDispatch();
    useEffect(() => {
        const unSubs = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }))
            }
        })
        return () => unSubs();
    }, [])

    if (!user) {
        return <Login />
    }
    return (
        <Component />
    )
}

export default ProtectedRoute