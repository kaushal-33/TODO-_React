import { useEffect, useState } from 'react'
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ Component }) => {
    const [activeUser, setActiveUser] = useState(null);
    useEffect(() => {
        const unSubs = onAuthStateChanged(auth, (user) => {
            if (user) {
                setActiveUser(user);
            }
        })
        return () => unSubs();
    }, [])

    if (!activeUser) {
        return <Login />
    }
    return (
        <Component />
    )
}

export default ProtectedRoute