export type TabType = {
  name: string;
  link: string;
};

export type ProblemSchema = {
  id: string;
  problemNo: number;
  name: string;
  difficulty: string;
  isSolved: boolean;
  videoLink: string;
  category: string;
};
export interface ProblemExampleProps {
  id: number;
  imageUrl?: string;
  inputText: string;
  outputText: string;
  explanation?: string;
}

interface StarterCode {
  javascript: string;
  java?: string;
  cpp?: string;
}

export type ResponseStatusCode = 200 | 400 | 401 | 403 | 404 | 500;
export interface ProblemDetailsProps extends ProblemSchema {
  infoPage: {
    problemStatement: string;
    examples: ProblemExampleProps[];
    constraints: string;
    starterCode: any;
  };
}

export const SUPPORTED_LANGUAGES_ARRAY = [
  { key: "javascript", value: "JavaScript" },
  { key: "java", value: "Java" },
  { key: "cpp", value: "C++" },
];
export const LANGUAGE_MAPPING: {
  [key: string]: {
    judge0: number;
    internal: number;
    name: string;
    monaco: string;
  };
} = {
  javascript: {
    judge0: 63,
    internal: 1,
    name: "Javascript",
    monaco: "javascript",
  },
  cpp: { judge0: 54, internal: 2, name: "C++", monaco: "cpp" },
  java: { judge0: 62, internal: 4, name: "Java", monaco: "java" },
};
export interface checkOutputResponse {
  test_case_id: number;
  status: SubmissionStatusType;
  user_output: any;
  expected_output: any;
  message: SubmissionDescriptionType;
}

enum SubmissionDescriptionType {
  success = "Success",
  wrong_answer = "Wrong Answer",
  tle = "Time Limit Exceed",
  run_time_error = "Run Time Error",
  compiler_error = "Compiler Error",
  na = "Invalid code",
}
enum SubmissionStatusType {
  accepted = "Accepted",
  failed = "Failed",
}

enum ResponseStatusType {
  Success = "success",
  Error = "error",
}
export enum ProblemDifficulty {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard",
}

export { SubmissionStatusType, SubmissionDescriptionType, ResponseStatusType };
