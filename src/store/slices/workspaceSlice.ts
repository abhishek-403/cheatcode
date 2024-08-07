import { createSlice } from "@reduxjs/toolkit";
import { ResponseStatusType } from "../../common/problem-types";

export interface WorkSpaceState {
  isLoading: boolean;
  submissionData: any | null;
  isError: boolean;
}

const initialState: WorkSpaceState = {
  isLoading: false,
  submissionData: null,
  isError: false,
};

export const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: initialState,
  reducers: {
    setSubmissionData: (_, action) => {
      if (action.payload.submissionData.status === ResponseStatusType.Error) {
        return {
          submissionData: action.payload.submissionData.result,
          isLoading: action.payload.isLoading,
          isError: true,
        };
      } else {
        return {
          submissionData: action.payload.submissionData.result,
          isLoading: action.payload.isLoading,
          isError: false,
        };
      }
    },
    resetSubmissionData: (_, __) => {
      return {
        submissionData: null,
        isLoading: false,
        isError: false,
      };
    },
    setSubmissionLoading: (state, action) => ({
      ...state,
      isLoading: action.payload.isLoading,
    }),
  },
});

export const { setSubmissionData, resetSubmissionData, setSubmissionLoading } =
  workSpaceSlice.actions;

export default workSpaceSlice.reducer;
