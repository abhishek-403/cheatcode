import {
  CheckOutputResponse,
  ResponseStatusType,
  SubmissionStatusType,
} from "../../common/problem/types";

type TabType = {
  link: string;
  name: string;
};
enum ProblemTabs {
  description = "Description",
  submissions = "Submissions",
}

type ICheckResultSummary = {
  status: ResponseStatusType;
  data: {
    submission_status: SubmissionStatusType;
    detailedInfo: CheckOutputResponse[];
  };
} | null;

export { type TabType, ProblemTabs, type ICheckResultSummary };
