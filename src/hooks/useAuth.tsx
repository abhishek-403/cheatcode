import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";


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
