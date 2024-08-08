import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterUserProps } from "../../common/user-types";
import {
  baseQueryWithAuthToken,
  fetchBaseQueryWithAuth,
} from "../services/index";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQueryWithAuth(),
  tagTypes: ["User", "OtherUser"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, RegisterUserProps>({
      query: (body) => ({
        url: "/auth/registerUser",
        method: "POST",
        body,
      }),
    }),
    getUserByUserName: builder.query<any, string>({
      query: (userName) => `/user/profile/${userName}`,
    }),
    getUser: builder.query<any, void>({
      query: () => `/user/profile`,
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetUserByUserNameQuery,
  useGetUserQuery,
} = userApi;
export const { registerUser } = userApi.endpoints;
