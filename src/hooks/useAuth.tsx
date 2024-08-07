import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import { useGetUserQuery, userApi } from "../store/services/user";
import { useAppDispatch } from "../store";

interface AuthUser {
  imageUrl: string;
  email: string;
  name: string;
}

export function isUserAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<{
    user:
      | {
          imageUrl: string;
          userName: string;
        }
      | null
      | any;
    isLoading: boolean;
    isAuthenticated: boolean;
  }>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,async (user: any) => {
      if (auth.currentUser) {
        const { data } = await dispatch(userApi.endpoints.getUser.initiate());
        
        return setIsAuthenticated({
          user: { ...data.result },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        return setIsAuthenticated({
          user:null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  return isAuthenticated;
}
