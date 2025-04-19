import { auth } from "../firebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import api from "../api/axios";
export const signIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const register = async (data) => {
  return await api.post("auth/register", data);
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const changePassword = async (newPassword) => {
  try {
    await updatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
