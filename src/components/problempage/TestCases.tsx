import { useEffect, useState } from "react";
import {
  checkOutputResponse,
  ProblemDetailsProps,
  ResponseStatusType,
  SubmissionDescriptionType,
  SubmissionStatusType,
} from "../constants/types";
import { IonButton, IonIcon, IonLoading } from "@ionic/react";
import { checkmarkCircle, closeCircleOutline } from "ionicons/icons";
import Spinner from "../custom-ui/loading";
type TestCasesProps = {
  problem: ProblemDetailsProps;
};

const TestCases: React.FC<TestCasesProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  return (
    <>
      <div className="flex my-2">
        {problem?.infoPage.examples.map((example: any, index: any) => (
          <div
            className="mr-2 items-start mt-2 "
            key={index}
            onClick={() => setActiveTestCaseId(index)}
          >
            <div className="flex flex-wrap items-center gap-y-4">
              <div
                className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
                    `}
              >
                Case {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="font-semibold my-4">
        <p className="text-sm font-medium mt-4 text-white">Input :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem?.infoPage.examples[activeTestCaseId].inputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Expected :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem?.infoPage.examples[activeTestCaseId].outputText}
        </div>
      </div>
    </>
  );
};

interface TestCasesResultProps {
  problem: any;
  resultSummary:
    | {
        submission_status: SubmissionStatusType;
        detailedInfo: checkOutputResponse[];
      }
    | null
    | ResponseStatusType.Error;
  isLoading: boolean;
}

export const TestCasesResult: React.FC<TestCasesResultProps> = ({
  problem,
  resultSummary,
  isLoading,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

  if (isLoading) {
    return (
      <div className="relative flex items-center justify-center mt-16">
        <Spinner isOpen={true} />
      </div>
    );
  }
  if (!resultSummary) {
    return (
      <div className="flex items-center justify-center mt-16">
        Run your code first!
      </div>
    );
  }
  if (resultSummary === ResponseStatusType.Error) {
    return (
      <div className="flex items-center justify-center mt-16 text-red-400 font-semibold">
        Internal Error
      </div>
    );
  }
  const isAccepted =
    resultSummary.submission_status === SubmissionStatusType.accepted;

  return (
    <>
      <div className="my-2 font-bold text-xl">
        {isAccepted ? (
          <div className={`text-green-400 py-3 px-2`}>
            {resultSummary.submission_status}
          </div>
        ) : (
          <div className={`text-red-500 py-3 px-2`}>
            <span className="">{resultSummary.submission_status} </span>
            <span className="">
              {resultSummary.detailedInfo[activeTestCaseId].message !==
                SubmissionDescriptionType.success &&
                ": " + resultSummary.detailedInfo[activeTestCaseId].message}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 ">
        {problem?.infoPage?.examples
          ?.slice(0, resultSummary.detailedInfo.length)
          .map((example: any, index: number) => (
            <div
              className="items-start "
              key={example.id}
              onClick={() => setActiveTestCaseId(index)}
            >
              <div className="flex flex-wrap items-center gap-y-4">
                <div
                  className={`font-semibold items-center transition-all focus:outline-none inline-flex border border-black bg-dark-fill-3 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${
                    resultSummary.detailedInfo[index].status ===
                    SubmissionStatusType.accepted
                      ? activeTestCaseId === index
                        ? "border-green-500 text-green-500 "
                        : "text-green-500"
                      : activeTestCaseId === index
                      ? "text-red-500 border-red-500"
                      : "text-red-500"
                  }

                    `}
                >
                  <div className="flex gap-2 items-center justify-center">
                    {resultSummary.detailedInfo[index].status ===
                    SubmissionStatusType.accepted ? (
                      <IonIcon icon={checkmarkCircle} size="lg" />
                    ) : (
                      <IonIcon icon={closeCircleOutline} size="lg" />
                    )}{" "}
                    Case {index + 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="font-semibold my-4">
        <p className="text-sm font-medium mt-4 text-white">Input :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem.infoPage.examples[activeTestCaseId].inputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Output :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {resultSummary.detailedInfo[activeTestCaseId].user_output ?? "null"}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Expected :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {resultSummary.detailedInfo[activeTestCaseId].expected_output}
        </div>
      </div>
    </>
  );
};

export default TestCases;
