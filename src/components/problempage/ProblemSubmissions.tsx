import { IonIcon } from "@ionic/react";
import { Editor } from "@monaco-editor/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { checkmarkCircle, skullSharp } from "ionicons/icons";
import React from "react";
import { useAppSelector } from "../../store";
import { useGetMySubmissionsByProblemIdQuery } from "../../store/services/problem";
import {
  SubmissionListSkeleton,
  SubmissionResultSkeleton,
} from "../../utils/skeletons";
import {
  LANGUAGE_MAPPING,
  SubmissionStatusType,
} from "../../common/problem-types";

const ProblemSubmission = ({ problemId }: { problemId: string }) => {
  const codeSubmissionResult = useAppSelector((s) => s.workspace);
  const { data, isLoading } = useGetMySubmissionsByProblemIdQuery({
    problemId,
  });

  if (isLoading) {
    return <SubmissionListSkeleton />;
  }
  return (
    <div className="w-full">
      {codeSubmissionResult.isLoading ? (
        <SubmissionResultSkeleton />
      ) : codeSubmissionResult.isError ? (
        <div className=" rounded-lg w-full mt-8 mb-14  gap-1 flex text-center flex-col font-bold  font-roboto ">
          <div className="text-red-400 text-xl bg-neutral-80 px-4 py-2 rounded-lg w-fit mx-auto">
            Submission Failed
          </div>
          <div className=" text-red-300  px-4 py-2 rounded-lg w-fit mx-auto">
            {codeSubmissionResult.submissionData}
          </div>
        </div>
      ) : (
        codeSubmissionResult.submissionData && (
          <SubmissionAlert
            codeSubmissionResult={codeSubmissionResult.submissionData}
          />
        )
      )}

      <SubmissionsList data={data.result} />
    </div>
  );
};
const SubmissionAlert = ({ codeSubmissionResult }: any) => {
  const runtime = codeSubmissionResult.data.runtime;
  const memory = codeSubmissionResult.data.memoryUsed;
  const testCasesPassed = codeSubmissionResult.data.testCasesPassed;
  const totalTestCases = codeSubmissionResult.data.totalTestCases;
  const userCode = codeSubmissionResult.userCode;
  const language = codeSubmissionResult.data.language;

  const error_description = codeSubmissionResult.data.error_description;
  const user_stdout = codeSubmissionResult.data.user_stdout;
  const user_output = codeSubmissionResult.data.user_output;
  const expected_output = codeSubmissionResult.data.expected_output;
  const formattederror =
  error_description &&
  error_description.split("\r\n").map((line: any, index: any) => (
      <div key={index} style={{ whiteSpace: "pre-wrap" }}>
        {line}
      </div>
    ));

  if (!codeSubmissionResult) {
    return (
      <div className="flex items-center justify-center mt-16 text-red-400 font-semibold">
        Internal Error
      </div>
    );
  }
  const isAccepted =
    codeSubmissionResult.submissionStatus.status ===
    SubmissionStatusType.accepted;

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      <div className="">
        {isAccepted ? (
          <div className="flex font-inter flex-col mx-4 py-3 mb-4  border-b border-neutral-80">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-2xl text-green-500  font-bold ">
                <span>
                  <IonIcon
                    icon={checkmarkCircle}
                    className="flex items-center justify-center"
                  />
                </span>
                <span>{codeSubmissionResult.submissionStatus.status}</span>
              </div>
              <div className="flex flex-col px-2 text-sm text-neutral-40">
                <span className="">
                  Runtime :{" "}
                  <span className="font-bold">
                    {Math.round(runtime * 100) / 100} ms{" "}
                  </span>
                </span>
                <span className="">
                  Memory :{" "}
                  <span className="font-bold">
                    {Math.round(memory * 100) / 100} MB{" "}
                  </span>
                </span>
              </div>
            </div>
            <div className="items-center justify-center p-4 h-[40vh]">
              <Editor
                height={"100%"}
                width={"100%"}
                language={LANGUAGE_MAPPING[language].monaco}
                theme="vs-dark"
                value={userCode}
                options={{
                  domReadOnly: true,
                  readOnly: true,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col mx-4 py-3 mb-4 border-b border-neutral-80">
            <div className="flex flex-col gap-3">
              <div
                className={`text-red-500 flex gap-3 items-center font-bold font-roboto text-2xl`}
              >
                <span>
                  <IonIcon
                    icon={skullSharp}
                    className="flex items-center justify-center"
                  />
                </span>
                <span>{codeSubmissionResult.submissionStatus.status} : </span>
                <span className="">
                  {codeSubmissionResult.submissionStatus.description}
                </span>
              </div>
              <span className="text-neutral-40 font-roboto text-base px-2">
                {testCasesPassed}/{totalTestCases} <span>testcases passed</span>
              </span>
            </div>
            <div className="items-center justify-center p-4 h-[40vh]">
              <Editor
                height={"100%"}
                width={"100%"}
                language={LANGUAGE_MAPPING[language].monaco}
                theme="vs-dark"
                value={userCode}
                options={{
                  domReadOnly: true,
                  readOnly: true,
                  automaticLayout: true,
                }}
              />
            </div>
            <div className="">
              <div className="font-semibold my-4">
                {/* <p className="text-sm font-medium mt-4 text-white">Input :</p>
                <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                  {}
                </div> */}
                {formattederror && (
                  <div className="w-full text-red-400 cursor-text rounded-lg border px-3 py-[10px] font-normal mx-auto bg-dark-fill-3 border-transparent text-sm mt-2">
                    {formattederror}
                  </div>
                )}
                {user_stdout && (
                  <>
                    <p className="text-sm font-medium mt-4 text-neutral-40">
                      Stdout :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {user_stdout}
                    </div>
                  </>
                )}
                {user_output && (
                  <>
                    <p className="text-sm font-medium mt-4 text-neutral-40">
                      Output :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {user_output}
                    </div>
                  </>
                )}

                {expected_output && (
                  <>
                    <p className="text-sm font-medium mt-4 text-neutral-40">
                      Expected :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {expected_output}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type SubmissionsListProps = { data: any };

const SubmissionsList: React.FC<SubmissionsListProps> = ({ data }) => {
  if (typeof data !== typeof [] || !data.length) {
    return (
      <div className="w-full mt-10 text-primary-120 font-poppins items-center justify-center flex ">
        No previous submissions
      </div>
    );
  }
  return (
    <div className="pb-4 min-w-[40vw]">
      <div className="grid grid-cols-5 text-sm font-inter text text-neutral-40 py-2 px-8 text-center">
        <div className="text-left">Status</div>
        <div className="">Language</div>
        <div className="">Runtime</div>
        <div className="">Memory</div>
        <div className="">Date</div>
      </div>

      <Accordion variant="splitted" className="dark">
        {data?.map((elem: any, i: any) => (
          <AccordionItem
            key={i}
            title={
              <div className="grid grid-cols-5 text-sm font-inter align-center justify-center text-center  text-neutral-30  items-center w-full h-fit">
                <div className=" text-left text-base font-bold w-[200px]">
                  {elem.submissionStatus.status ===
                  SubmissionStatusType.accepted ? (
                    <div className="text-green-500">
                      {elem.submissionStatus.description}
                    </div>
                  ) : (
                    <div className="text-red-500">
                      {elem.submissionStatus.description}
                    </div>
                  )}
                </div>
                <div className="">
                  {LANGUAGE_MAPPING[elem.data.language] === undefined
                    ? "JavaScript"
                    : LANGUAGE_MAPPING[elem.data.language].name}
                </div>
                <div className="">{Math.round(elem.data.runtime)} ms</div>
                <div className="">{Math.round(elem.data.memoryUsed)} MB</div>
                <div className="">{elem.data.submissionDate}</div>
              </div>
            }
            className="mb-[1px] hover:bg-neutral-80"
            indicator={<div className=""></div>}
          >
            <div className="py-2 h-[40vh] overflow-auto rounded-xl ">
              <Editor
                height={"100%"}
                width={"100%"}
                language={
                  LANGUAGE_MAPPING[elem.data.language] === undefined
                    ? "javascript"
                    : LANGUAGE_MAPPING[elem.data.language].monaco
                }
                theme="vs-dark"
                value={elem.userCode}
                options={{
                  domReadOnly: true,
                  readOnly: true,
                  automaticLayout: true,
                }}
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProblemSubmission;
