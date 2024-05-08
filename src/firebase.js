import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getAdditionalUserInfo,
  applyActionCode,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const logInWithEmailAndPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
const isNewUser = (user) => {
  console.log("first time user data ", getAdditionalUserInfo(user));
  return getAdditionalUserInfo(user).isNewUser;
};
const sendVerificationEmail = async () => {
  console.log(auth.currentUser, "auth.currentUser");
  return await sendEmailVerification(auth.currentUser);
};
const verifyActionCode = async (oobCode) => {
  return await applyActionCode(auth, oobCode);
};
const LogOut = async () => {
  try {
    const response = await signOut(auth);
    localStorage.removeItem("productsCount");
    localStorage.removeItem("tourStart");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
const sendForgotPasswordEmail = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

const getIdTokenFuntion = async () => {
  try {
    const response = await auth.currentUser.getIdTokenResult();
    return response.token;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
const getIdCurrentUserToken = async (value = true) => {
  try {
    const response = auth.currentUser.getIdTokenResult();
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  sendVerificationEmail,
  LogOut,
  sendForgotPasswordEmail,
  isNewUser,
  verifyActionCode,
  getIdTokenFuntion,
  getIdCurrentUserToken,
};
