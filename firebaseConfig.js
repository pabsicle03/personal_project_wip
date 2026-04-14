// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcaR36JZk_Fw6JVGK_ZBWnJIbzlRkx9GM",
  authDomain: "roommatematch-95763.firebaseapp.com",
  projectId: "roommatematch-95763",
  storageBucket: "roommatematch-95763.firebasestorage.app",
  messagingSenderId: "761114797653",
  appId: "1:761114797653:web:b94b84f5392338d112d6dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export const auth = getAuth(app);

export const signUpUser = async (email, password) => {
  // 1. Strict .edu check
  if (!email.endsWith('.edu')) {
    throw new Error("Please use your official college (.edu) email address.");
  }

  try {
    // 2. Create the account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 3. Send verification email
    // This ensures they actually own the college inbox
    await sendEmailVerification(user);
    
    return "Verification email sent! Please check your inbox.";
  } catch (error) {
    throw new Error(error.message);
  }
};