// auth import
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-hot-toast";

function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();
  const registerWithGoogle = async () => {
    setIsPending(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Хуш келибсиз, хурматли ${user.displayName}!`);

      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      setIsPending(false);
    }
  };
  const registerEmailAndPassword = async (
    email,
    password,
    displayName,
    photoURL
  ) => {
    try {
      const register = createUserWithEmailAndPassword(auth, email, password);
      setIsPending(true);
      const user = (await register).user;
      await updateProfile(auth.currentUser, {
        photoURL,
        displayName,
      });
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Хуш келибсиз, хурматли ${user.displayName}!`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };
  return { registerWithGoogle, isPending, registerEmailAndPassword };
}

export { useRegister };
