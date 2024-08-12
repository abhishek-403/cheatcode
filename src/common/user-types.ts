import {
  ProblemDifficulty,
  ResponseStatusCode,
  ResponseStatusType,
} from "./problem-types";

interface RegisterUserProps {
  name: string;
  email: string;
  imageUrl: string;
  uid: string;
  userName: string;
}

enum UserRoles {
  admin = "Admin",
  moderator = "Moderator",
  user = "User",
}

interface GetUserByNameResponse {
  result: {
    user: {
      name: string;
      email: string;
      userName: string;
      imageUrl: string;
      submissions: any;
    };
    solvedTotals: { difficulty: ProblemDifficulty; total: number }[];
    totals: { difficulty: ProblemDifficulty; total: number }[];
    isMyProfile: boolean;
  };
  status: ResponseStatusType;
  statusCode: ResponseStatusCode;
}
export { type RegisterUserProps, type GetUserByNameResponse, UserRoles };
