import { createSlice } from "@reduxjs/toolkit";
import {
  SubmissionStatusType,
  submitOutputResponse,
} from "../../components/constants/types";

export interface WorkSpaceState {
  isLoading: boolean;
  submissionData: any | null;
}

const initialState: WorkSpaceState = {
  isLoading: false,
  submissionData: null,
};

export const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState: initialState,
  reducers: {
    setSubmissionData: (_, action) => {
      return {
        submissionData: action.payload.submissionData,
        isLoading: action.payload.isLoading,
      };
    },
    resetSubmissionData: (_, __) => {
      return {
        submissionData: null,
        isLoading: false,
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
