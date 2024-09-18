type SupportedLanguagesInternal = "cpp";
const LANGUAGE_MAPPING: {
  [key: string]: {
    judge0: number;
    internal: SupportedLanguagesInternal;
    name: string;
    monaco: string;
  };
} = {
  cpp: { judge0: 54, internal: "cpp", name: "C++", monaco: "cpp" },
  // javascript: {
  //   judge0: 63,
  //   internal: "js",
  //   name: "Javascript",
  //   monaco: "javascript",
  // },
  // java: { judge0: 62, internal: "java", name: "Java", monaco: "java" },
};

const SUPPORTED_LANGUAGES_ARRAY: {
  key: string;
  value: string;
}[] = [
  { key: "cpp", value: "C++" },
  // { key: "javascript", value: "JavaScript" },
  // { key: "java", value: "Java" },
];

enum SubmissionDescriptionType {
  success = "Success",
  wrong_answer = "Wrong Answer",
  tle = "Time Limit Exceed",
  run_time_error = "Run Time Error",
  compiler_error = "Compiler Error",
  na = "Invalid code",
}
enum ProblemDifficulty {
  easy = "Easy",
  medium = "Medium",
  hard = "Hard",
}

enum SubmissionStatusType {
  accepted = "Accepted",
  failed = "Failed",
}

enum ResponseStatusType {
  Success = "success",
  Error = "error",
}
type ResponseStatusCode = 200 | 400 | 401 | 403 | 404 | 500 | 429;
// enum ResponseStatusCode {
//   OK = 200,
//   BadRequest = 400,
//   Unauthorized = 401,
//   Forbidden = 403,
//   NotFound = 404,
//   InternalServerError = 500,
// }
type ProblemSchema = {
  id: string;
  problemNo: number;
  name: string;
  difficulty: string;
  status: string;
  videoLink: string;
  category: string;
};
interface ProblemExampleProps {
  id: number;
  imageUrl?: string;
  inputText: string;
  outputText: string;
  explanation?: string;
}

interface StarterCode {
  js: string;
  java?: string;
  cpp?: string;
}

interface ProblemDetailsProps extends ProblemSchema {
  infoPage: {
    problemStatement: string;
    examples: ProblemExampleProps[];
    constraints: string;
    starterCode: any;
  };
}

interface CheckOutputResponse {
  test_case_id: number;
  status: SubmissionStatusType;
  user_output: any;
  expected_output: any;
  message: SubmissionDescriptionType;
}

interface SubmitOutputResponse {
  submission_status: SubmissionStatusType;
  submission_description: SubmissionDescriptionType;
  runtime: number;
  memoryUsed: number;
  totalTestCasesPassed: number;
  totalTestCases: number;
}

interface ProblemResponseType {
  name: string;
  id: string;
  difficulty: ProblemDifficulty;
  videoLink?: string;
  problemNo: number;
  isSolved: boolean;
  category: string;
}

export {
  type SubmitOutputResponse,
  type CheckOutputResponse,
  type ProblemDetailsProps,
  type ProblemSchema,
  type ResponseStatusCode,
  ResponseStatusType,
  SubmissionStatusType,
  ProblemDifficulty,
  SubmissionDescriptionType,
  LANGUAGE_MAPPING,
  type SupportedLanguagesInternal,
  type ProblemResponseType,
  SUPPORTED_LANGUAGES_ARRAY,
};

