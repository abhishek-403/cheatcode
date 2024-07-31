import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type SheetsFormat = {
  name: string;
  solvedByUser: number;
  totalProblems: number;
};

export const problemApi = createApi({
  reducerPath: "problemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
  }),
  tagTypes: ["Sheets"],
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
  }),
});

export const { useGetAllSheetsQuery, useGetProblemsBySheetIdQuery } =
  problemApi;
