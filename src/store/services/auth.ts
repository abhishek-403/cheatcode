import {
  createApi,
  fakeBaseQuery
} from "@reduxjs/toolkit/query/react";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { registerUser } from "./user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signInWithGoogle: builder.mutation<any, void>({
      queryFn: async (
        _arg,
        { dispatch, getState },
        _extraOptions,
        baseQuer
      ) => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          if (!user.displayName || !user.email || !user.uid || !user.photoURL) {
            return { data: { user } };
          }
          const { data: registeredUser } = await dispatch(
            registerUser.initiate({
              name: user.displayName,
              email: user.email,
              imageUrl: user.photoURL,
              uid: user.uid,
            })
          );
        

          return { data: { registeredUser } };
        } catch (err) {
          return { error: err };
        }
      },
    }),

    signOut: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await auth.signOut();
          return { data: null };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useSignOutMutation, useSignInWithGoogleMutation } = authApi;
