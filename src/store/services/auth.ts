import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // registerUser:builder.query()
    // ,
    signInWithGoogle: builder.mutation<any, void>({
      queryFn: async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          const user = result.user;

          return { data: { user } };
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
