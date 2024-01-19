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
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const auth = getAuth(app);

  const signUpUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
contextValue
const updateUserProfile = (name, photoUrl) => {
  setLoader(true);
  return updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photoUrl,
  });
};
const signInUser = (email, password) => {
  setLoader(true);
  return signInWithEmailAndPassword(auth, email, password);
};
const signOutUser = () => {
  return signOut(auth);
};

const contextValue = {
  signUpUser,
  signInUser,
  user,
  loader,
  signOutUser,
  updateUserProfile,
};
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoader(false)
  });
  return () => unsubscribe();
}, [auth]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
