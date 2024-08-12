import {
  createApi
} from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWithAuth } from "./index";

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
        method: "GET",
      }),
    }),
    getProblemsBySheetId: builder.query<any, { sheetId: string }>({
      query: (args) => ({
        url: `/problem/by-sheet/${args.sheetId}`,
        method: "GET",
      }),
    }),
    getProblem: builder.query<any, { problemId: string }>({
      query: (args) => ({
        url: `/problem/${args.problemId}`,
        method: "GET",
      }),
    }),
    runProblem: builder.mutation<
      any,
      { sourceCode: string; languageId: string; problemId: string }
    >({
      query: (args) => ({
        url: `/problem/${args.problemId}/check`,
        method: "POST",
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
        method: "POST",
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
