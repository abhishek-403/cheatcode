import { useState } from "react";

import { IonIcon } from "@ionic/react";
import { checkmarkCircle, closeCircleOutline } from "ionicons/icons";
import { TestCasesSkeleton } from "../../utils/skeletons";
import {
  CheckOutputResponse,
  ProblemDetailsProps,
  ResponseStatusType,
  SubmissionDescriptionType,
  SubmissionStatusType,
} from "../../common/problem-types";
import { ICheckResultSummary } from "../constants/problem-types";
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
                className={`font-medium items-center  focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${
                      activeTestCaseId === index
                        ? "text-white border-[2px] border-neutral-40"
                        : "text-gray-500 border-[2px] border-black"
                    }
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
  resultSummary: ICheckResultSummary;
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
      <div className="relative">
        <TestCasesSkeleton />
      </div>
    );
  }
  if (!resultSummary) {
    return (
      <TestCases problem={problem} />
      // <div className="flex items-center justify-center mt-16 text-red-400 ">
      //   Error Occurred
      // </div>
    );
  }

  if (resultSummary.status === ResponseStatusType.Error) {
    return (
      <div className="flex items-center justify-center mt-16 text-red-400 font-semibold w-full h-full">
        {JSON.stringify(resultSummary.data).replace(/"/g, "")}
      </div>
    );
  }

  const isAccepted =
    resultSummary.data.submission_status === SubmissionStatusType.accepted;
  const formattedMessage =
    resultSummary.data.detailedInfo[activeTestCaseId].error_description &&
    resultSummary.data.detailedInfo[activeTestCaseId].error_description
      .split("\r\n")
      .map((line, index) => (
        <div key={index} style={{ whiteSpace: "pre-wrap" }}>
          {line}
        </div>
      ));
  return (
    <>
      <div className="my-2 font-bold text-xl">
        {isAccepted ? (
          <div className={`text-green-400 py-3 px-2`}>
            {resultSummary.data.submission_status}
          </div>
        ) : (
          <div className={`text-red-500 py-3 px-2`}>
            <span className="">{resultSummary.data.submission_status} </span>
            <span className="">
              {resultSummary.data.detailedInfo[activeTestCaseId].message !==
                SubmissionDescriptionType.success &&
                ": " +
                  resultSummary.data.detailedInfo[activeTestCaseId].message}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 ">
        {problem?.infoPage?.examples
          ?.slice(0, resultSummary.data.detailedInfo.length)
          .map((example: any, index: number) => {
            return (
              <div
                className="items-start "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-semibold items-center  focus:outline-none inline-flex  border-black bg-dark-fill-3 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap border-[2px]
                  ${
                    resultSummary.data.detailedInfo[index].status ===
                    SubmissionStatusType.accepted
                      ? activeTestCaseId === index
                        ? "border-green-500 text-green-500 "
                        : "text-green-500"
                      : activeTestCaseId === index
                      ? "text-red-500 border-[2px] border-red-500"
                      : "text-red-500"
                  }

                    `}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      {resultSummary.data.detailedInfo[index].status ===
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
            );
          })}
      </div>
      <div className="font-semibold my-4">
        {resultSummary.data.detailedInfo[activeTestCaseId]
          .error_description && (
          <div className="w-full text-red-400 cursor-text rounded-lg border px-3 py-[10px] font-normal mx-auto bg-dark-fill-3 border-transparent text-sm mt-2">
            {formattedMessage ?? ""}
          </div>
        )}
        <p className="text-sm font-medium mt-4 text-white">Input :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem.infoPage.examples[activeTestCaseId].inputText}
        </div>
        {resultSummary.data.detailedInfo[activeTestCaseId].user_output && (
          <>
            <p className="text-sm font-medium mt-4 text-white">Output :</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {resultSummary.data.detailedInfo[activeTestCaseId].user_output}
            </div>
          </>
        )}
        <p className="text-sm font-medium mt-4 text-white">Expected :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {resultSummary.data.detailedInfo[activeTestCaseId].expected_output}
        </div>
      </div>
    </>
  );
};

export default TestCases;
