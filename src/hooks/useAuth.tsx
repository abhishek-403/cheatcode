import { useSelector } from "react-redux";
import { AuthState } from "../store/slices/authSlice";
import { RootState } from "../store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useEffect, useLayoutEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";

export function useAuth() {
  // const auth = useSelector<RootState, AuthState>((state) => state.auth);
  const user = getAuth().currentUser;
  if (user) {
    return {
      isAuthenticated: true,
      refreshToken: user.refreshToken,
    };
  }
  return {
    isAuthenticated: false,
  };
}
interface AuthUser {
  imageUrl: string;
  email: string;
  name: string;
}
export function getUser() {
  const [user, setUser] = useState<{
    user: AuthUser | undefined;
    isLoading: boolean;
    isAuthenticated:boolean
  }>({
    user: undefined,
    isLoading: true,
    isAuthenticated:false
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (auth.currentUser) {
        return setUser({
          user: {
            imageUrl: user.photoURL,
            email: user.email,
            name: user.displayName,
          },
          isAuthenticated:true,
          isLoading: false,
        });
      }
      else{
        return setUser({
          user: undefined,
          isAuthenticated:false,
          isLoading: false,
        });

      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return user;
}
