import { useEffect } from 'react'
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setUser } from '../features/authSlice';

const ProtectedRoute = ({ Component }) => {
    const { user, isLoading } = useSelector(state => state.authUser)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setIsLoading(true))
        const unSubs = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setIsLoading(false))
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

    if (isLoading) {
        return <div className='h-screen bg-[#081e12] text-white flex justify-center items-center'>
            <span className='uppercase text-3xl'>loading...</span>
        </div>
    }

    if (!user) {
        return <Login />
    }
    return (
        <Component />
    )
}

export default ProtectedRoute