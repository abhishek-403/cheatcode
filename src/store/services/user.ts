// import {
//     GetUserByDisplayNameApiResponse,
//     MutualFollowersApiResponse,
//     User,
//     UserApiResponse,
//     UserByUsernameApiResponse,
//   } from "@/types/user-api";
//   import { baseQuery } from "@/utils/services";
//   import { createApi } from "@reduxjs/toolkit/query/react";
//   import toast from "react-hot-toast";
//   import { feedApi } from "./feed";
  
//   export interface ProfileInput {
//     firstName: string;
//     lastName: string;
//     userName: string;
//     profileImageUrl?: string;
//   }
  
//   export interface ProfileUpdateInput {
//     firstName?: string;
//     lastName?: string;
//     userName?: string;
//     profileImageUrl?: string;
//     tagline?: string;
//     coverImageUrl?: string | null;
//   }
  
//   export const userApi = createApi({
//     reducerPath: "userApi",
//     baseQuery,
//     tagTypes: ["User", "MutualFollowers", "OtherUser"],
//     endpoints: (builder) => ({
//       getUser: builder.query<UserApiResponse, void>({
//         query: () => "/users/profile",
//         providesTags: ["User"],
//       }),
  
//       getUsers: builder.query<User[], { userIds: string[] }>({
//         query: ({ userIds }) => {
//           const params = new URLSearchParams();
//           userIds.forEach((id) => params.append("userIds", id));
//           return {
//             url: "/users",
//             params,
//           };
//         },
//       }),
  
//       createProfile: builder.mutation<void, ProfileInput>({
//         query: (body) => ({
//           url: "/users/profile",
//           method: "POST",
//           body,
//         }),
//         invalidatesTags: ["User"],
//       }),
  
//       updateProfile: builder.mutation<void, ProfileUpdateInput>({
//         query: (body) => ({
//           url: "/users/profile",
//           method: "PATCH",
//           body,
//         }),
//         invalidatesTags: ["User"],
//       }),
  
//       reportUser: builder.mutation<void, { userId: string }>({
//         query: ({ userId }) => ({
//           url: `users/${userId}/report`,
//           method: "POST",
//         }),
//       }),
  
//       followUnfollowUser: builder.mutation<
//         void,
//         { userId: string; method: "follow" | "unfollow" }
//       >({
//         query: ({ userId, method }) => ({
//           url: `/users/${userId}/${method}`,
//           method: "POST",
//         }),
//         invalidatesTags: ["User", "MutualFollowers", "OtherUser"],
//         onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
//           const patch = dispatch(
//             userApi.util.updateQueryData("getUser", undefined, (draft) => ({
//               ...draft,
//               following:
//                 args.method === "follow"
//                   ? [...draft.following, args.userId]
//                   : draft.following.filter((id) => id !== args.userId),
//             }))
//           );
  
//           try {
//             await queryFulfilled;
//             dispatch(feedApi.util.invalidateTags(["FollowingFeed"]));
//           } catch (error) {
//             toast.error("Failed to follow user");
//             patch.undo();
//           }
//         },
//       }),
  
//       getUserByDisplayName: builder.query<
//         GetUserByDisplayNameApiResponse,
//         string
//       >({
//         query: (displayName) => `/users?search=${displayName}`,
//       }),
  
//       getUserByUsername: builder.query<UserByUsernameApiResponse, string>({
//         query: (username) => `/users/profile/${username}`,
//         providesTags: ["OtherUser"],
//       }),
  
//       getMutualFollowers: builder.query<MutualFollowersApiResponse, void>({
//         query: () => "/users/mutual-followers",
//         providesTags: ["MutualFollowers"],
//       }),
  
//       getUserById: builder.query<UserApiResponse, string>({
//         query: (userId) => `/users/${userId}`,
//       }),
  
//       updateUserActivity: builder.mutation<void, void>({
//         query: () => ({
//           url: "/users/activity",
//           method: "PATCH",
//         }),
//         onQueryStarted: async (_, { queryFulfilled }) => {
//           try {
//             await queryFulfilled;
//           } catch (error) {}
//         },
//       }),
//     }),
//   });
  
//   export const {
//     useGetUserQuery,
//     useGetUsersQuery,
//     useUpdateProfileMutation,
//     useCreateProfileMutation,
//     useFollowUnfollowUserMutation,
//     useGetUserByDisplayNameQuery,
//     useGetMutualFollowersQuery,
//     useGetUserByIdQuery,
//     useUpdateUserActivityMutation,
//     useGetUserByUsernameQuery,
//     useReportUserMutation,
//   } = userApi;
  