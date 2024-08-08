import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../index";
import { getAuth } from "firebase/auth";
export const baseQueryWithAuthToken = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/v1",
  async prepareHeaders(headers, { getState }) {
    headers.set("Content-Type", "application/json");

    await new Promise<void>((resolve) => {
      const maxAttempts = 5;
      const intervalTime = 500;
      let attempts = 0;

      function checkToken() {
        const user = (getState() as RootState).auth;
        
        if (user.token) {
          headers.set("Authorization", `Bearer ${user.token}`);
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkToken, intervalTime);
        } else {
          resolve();
        }
      }

      checkToken();
    });

    return headers;
  },
});
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
      baseUrl: "http://localhost:4000/api/v1",
      headers,
    })(args, api, extraOptions);
  };
};