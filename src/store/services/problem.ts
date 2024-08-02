import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getAuth } from "firebase/auth";

export type SheetsFormat = {
  name: string;
  solvedByUser: number;
  totalProblems: number;
};
const fetchBaseQueryWithAuth = () => {
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
        url: `/problems/by-sheet/${args.sheetId}`,
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
