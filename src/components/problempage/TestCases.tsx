import { useState } from "react";
type TestCasesProps = {
  problem: any;
};

const TestCases: React.FC<TestCasesProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  return (
    <>
      <div className="flex my-2">
        {problem?.examples.map((example: any, index: any) => (
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
          {problem?.examples[activeTestCaseId].inputText}
        </div>
        <p className="text-sm font-medium mt-4 text-white">Expected :</p>
        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
          {problem?.examples[activeTestCaseId].outputText}
        </div>
      </div>
    </>
  );
};

type TestCasesResultProps = {
  problem: any;
  resultSummary: any;
};

export const TestCasesResult: React.FC<TestCasesResultProps> = ({
  problem,
  resultSummary,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

  if (resultSummary === null) {
    return (
      <div className="flex items-center justify-center mt-16">
        Run your code first!
      </div>
    );
  }
  if (
    resultSummary.error_type === "Syntax Error" ||
    resultSummary.error_type === "Runtime Error"
  ) {
    return (
      <div>
        <div className={`text-red-500 my-2 font-bold text-xl`}>
          <span className="">{resultSummary.submission_status} : </span>
          <span className="">{resultSummary.error_type}</span>
        </div>
        <div>
          <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
            {resultSummary.error_message}
          </div>
        </div>
      </div>
    );
  }

  if (
    resultSummary.submission_status === "Accepted" ||
    resultSummary.error_type === "Wrong Answer"
  ) {
    return (
      <>
        <div className="my-2 font-bold text-xl">
          {resultSummary.submission_status === "Accepted" ? (
            <div className={`text-green-400`}>
              {resultSummary.submission_status}
            </div>
          ) : (
            <div className={`text-red-500`}>
              <span className="">{resultSummary.submission_status} : </span>
              <span className="">{resultSummary.error_type}</span>
            </div>
          )}
        </div>
        <div className="flex my-2">
          {problem?.examples?.map((example: any, index: any) => (
            <div
              className="mr-2 items-start mt-2 "
              key={example.id}
              onClick={() => setActiveTestCaseId(index)}
            >
              <div className="flex flex-wrap items-center gap-y-4">
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-flex border border-black bg-dark-fill-3 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${
                    resultSummary.compare_result[index] == "1"
                      ? activeTestCaseId === index
                        ? "border-green-500 text-green-500 "
                        : "text-green-500"
                      : activeTestCaseId === index
                      ? "text-red-500 border-red-500"
                      : "text-red-500"
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
            {problem?.examples[activeTestCaseId].inputText}
          </div>
          <p className="text-sm font-medium mt-4 text-white">Output :</p>
          <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
            {resultSummary.userOutputArray[activeTestCaseId]}
          </div>
          <p className="text-sm font-medium mt-4 text-white">Expected :</p>
          <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
            {resultSummary.expectedOutputArray[activeTestCaseId]}
          </div>
        </div>
      </>
    );
  }
};

export default TestCases;
