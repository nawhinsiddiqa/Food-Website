

import { createUserWithEmailAndPassword,  GoogleAuthProvider,onAuthStateChanged, signInWithEmailAndPassword, signOut,signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../Firebase/firebase.config';

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signInUser = (email, password) => {
        setLoading(true);
        console.log(email, password)
        return signInWithEmailAndPassword(auth, email, password)

    }
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
     }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;