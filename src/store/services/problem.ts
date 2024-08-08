import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";
import { baseQueryWithAuthToken, fetchBaseQueryWithAuth } from "./index";

export type SheetsFormat = {
  name: string;
  solvedByUser: number;
  totalProblems: number;
};

export const problemApi = createApi({
  reducerPath: "problemApi",
  baseQuery: fetchBaseQueryWithAuth(),
  tagTypes: ["Sheets", "ProblemList"],
  endpoints: (builder) => ({
    getAllSheets: builder.query<any, void>({
      query: () => ({
        url: "/sheets/all",
        method: "Get",
      }),
    }),
    getProblemsBySheetId: builder.query<any, { sheetId: string }>({
      query: (args) => ({
        url: `/problem/by-sheet/${args.sheetId}`,
        method: "Get",
      }),
    }),
    getProblem: builder.query<any, { problemId: string }>({
      query: (args) => ({
        url: `/problem/${args.problemId}`,
        method: "Get",
      }),
    }),
    runProblem: builder.mutation<
      any,
      { sourceCode: string; languageId: string; problemId: string }
    >({
      query: (args) => ({
        url: `/problem/${args.problemId}/check`,
        method: "Post",
        body: {
          sourceCode: args.sourceCode,
          languageId: args.languageId,
        },
      }),
    }),
    submitProblem: builder.mutation<
      any,
      { sourceCode: string; languageId: string; problemId: string }
    >({
      query: (args) => ({
        url: `/problem/${args.problemId}/submit`,
        method: "Post",
        body: {
          sourceCode: args.sourceCode,
          languageId: args.languageId,
        },
      }),
    }),

    getMySubmissionsByProblemId: builder.query<any, { problemId: string }>({
      query: (args) => ({
        url: `/problem/${args.problemId}/getSubmissions`,
      }),
    }),
  }),
});

export const {
  useGetAllSheetsQuery,
  useGetProblemsBySheetIdQuery,
  useRunProblemMutation,
  useSubmitProblemMutation,
  useGetProblemQuery,
  useGetMySubmissionsByProblemIdQuery,
} = problemApi;
