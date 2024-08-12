import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../index";
import { getAuth } from "firebase/auth";

export const fetchBaseQueryWithAuth = () => {
  return async (args: string | FetchArgs, api: any, extraOptions: any) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let token = "";

    if (user) {
      try {
        token = await user.getIdToken();
      } catch (error) {}
    }

    const headers = new Headers();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetchBaseQuery({
      baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
      headers,
    })(args, api, extraOptions);
  };
};