import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateName = (name) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
    })
  }

  const verify = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
  }

  const signInWithProvider = (provider) => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  }

  const logOut = () => {
    localStorage.removeItem('genius-token');
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully', { autoClose: 1000 })
      })
      .catch(err => {
        toast.error(err.message, { autoClose: 1000 });
      })
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe();

  }, [])


  const authInfo = {
    user,
    createUser,
    signIn,
    updateName,
    verify,
    signInWithProvider,
    loading,
    logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;