import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLayoutEffect, useState } from "react";
import { ResponseStatusType } from "../common/problem-types";
import { useAppDispatch } from "../store";
import { userApi } from "../store/services/user";
import { auth } from "../utils/firebaseConfig";

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
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (auth.currentUser) {
        const { data } = await dispatch(userApi.endpoints.getUser.initiate());

        if (data.status === ResponseStatusType.Error) {
          await auth.signOut();
          return setIsAuthenticated({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } else {
          return setIsAuthenticated({
            user: { ...data.result },
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        return setIsAuthenticated({
          user: null,
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
