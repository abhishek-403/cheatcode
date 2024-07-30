import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {
  ResponseStatusCode,
  ResponseStatusType,
} from "../../components/constants/types";
export interface RegisterUserProps {
  name: string;
  email: string;
  imageUrl: string;
  uid: string;
}
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      //   {
      //     status: ResponseStatusType;
      //     statusCode: ResponseStatusCode;
      //     result: any;
      //   },
      any,
      RegisterUserProps
    >({
      query: (body) => ({
        url: "/auth/registerUser",
        method: "POST",
        body,
      }),
    }),
  }),
});

// export const { useRegisterUserMutataion } = userApi;
export const { registerUser } = userApi.endpoints;
