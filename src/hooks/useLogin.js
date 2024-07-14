import { useState } from "react";

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  const signIn = async (email, password) => {
    try {
      setIsPending(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch({ type: "LOG_IN", payload: user });
      toast.success(`Хуш келибсиз, хурматли ${user.displayName}!`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(`Электрон почтангиз ёки паролингиз нотўғри!`);
      setIsPending(false);
    }
  };
  return { isPending, signIn };
};
