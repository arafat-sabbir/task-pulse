import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import app from "../FireBase/firebase.config";

export const Context = createContext("");

const AuthProvider = ({ children }) => {
  // Store The Currently SignIn User Data
  const [user, setUser] = useState("");
  //   Loading State For Managing Loading State
  const [loader, setLoader] = useState(true);
  const auth = getAuth(app);
  // SingUp User With Email And Password
  const signUpUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Update Profile Function For Updating User Profile
  const updateUserProfile = (name, photoUrl) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // Sign In User With Email And Password Function
  const signInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Sign Out User Function
  const signOutUser = () => {
    return signOut(auth);
  };
  // Share All The Relative Function With Context Api As Context Value
  const contextValue = {
    signUpUser,
    signInUser,
    user,
    loader,
    signOutUser,
    updateUserProfile,
  };

  // Oversee The User If SignIn Or Not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => unsubscribe();
  }, [auth]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthProvider;
// PropTypes For The Children
AuthProvider.propTypes = {
  children: PropTypes.node,
};
