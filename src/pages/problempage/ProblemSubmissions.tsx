import { javascript } from "@codemirror/lang-javascript";
import { IonIcon } from "@ionic/react";
import { Editor } from "@monaco-editor/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import { checkmarkCircle, skullSharp } from "ionicons/icons";
import React, { useEffect, useState } from "react";

const ProblemSubmission = ({}) => {
  const codeSubmissionResult = "";
  const [data, setData] = useState([]);
  async function fet() {
    try {
      let d = await axios.post(
        "/problems/65a6b0a99b69ec94d5ebe265/getmysubmissions"
      );
      if (d.data.status === "error") {
        setData([]);
        return;
      }
      setData(d.data.result);
    } catch (e) {}
  }
  useEffect(() => {
    fet();
  }, []);
  if (!data) {
    return <div></div>;
  }
  return (
    <div className="max-h-[calc(100vh-110px)] overflow-y-auto">
      {codeSubmissionResult && (
        <SubmissionAlert codeSubmissionResult={codeSubmissionResult} />
      )}
      <div className="overflow-auto">
        {data.length > 0 && <SubmissionsList data={data} />}
      </div>
    </div>
  );
};
const SubmissionAlert = ({ codeSubmissionResult }: any) => {
  let isAccepted =
    codeSubmissionResult.submission_status == "Accepted" ? true : false;
  const runtime = codeSubmissionResult.runtime;
  const memory = codeSubmissionResult.memory;
  const userCode = codeSubmissionResult.userCode;

  if (
    codeSubmissionResult.error_type === "Syntax Error" ||
    codeSubmissionResult.error_type === "Runtime Error"
  ) {
    return (
      <div className="p-4">
        <div
          className={`text-red-500 flex gap-3 items-center font-bold font-roboto text-2xl`}
        >
          <span>
            <IonIcon icon={skullSharp} />
          </span>
          <span className="">{codeSubmissionResult.submission_status} : </span>
          <span className="">{codeSubmissionResult.error_type}</span>
        </div>
        <div>
          <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
            {codeSubmissionResult.error_message}
          </div>
        </div>
      </div>
    );
  }
  if (
    codeSubmissionResult.submission_status === "Accepted" ||
    codeSubmissionResult.error_type === "Wrong Answer"
  ) {
    return (
      <div className="max-h-[90vh] overflow-y-auto">
        {codeSubmissionResult !== null && (
          <div className="">
            {isAccepted ? (
              <div className="flex font-inter flex-col px-5 py-4 ">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-3xl text-green-500  font-bold ">
                    <span>
                      <IonIcon icon={checkmarkCircle} />
                    </span>
                    <span>Accepted</span>
                  </div>
                  <div className="flex flex-col px-2">
                    <span className="">
                      Runtime :{" "}
                      <span className="font-bold">
                        {Math.round(runtime)}ms{" "}
                      </span>
                    </span>
                    <span className="">
                      Memory : <span className="font-bold">{memory}MB </span>
                    </span>
                  </div>
                </div>
                <div className="items-center justify-center p-4 ">
                  <Editor
                    height="100%"
                    width={"100%"}
                    theme="vs-dark"
                    value={userCode}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-2">
                  <div
                    className={`text-red-500 flex gap-3 items-center font-bold font-roboto text-2xl`}
                  >
                    <span>
                      <IonIcon icon={skullSharp} />
                    </span>
                    <span>{codeSubmissionResult.submission_status} : </span>
                    <span className="">{codeSubmissionResult.error_type}</span>
                  </div>
                  <span className="text-[#929292] text-sm">
                    {codeSubmissionResult.failed_test_case_number}/
                    {codeSubmissionResult.total_test_cases}{" "}
                    <span>testcases passed</span>
                  </span>
                </div>
                <div className="">
                  <div className="font-semibold my-4">
                    <p className="text-sm font-medium mt-4 text-white">
                      Input :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {codeSubmissionResult.failed_test_case}
                    </div>
                    <p className="text-sm font-medium mt-4 text-white">
                      Output :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {codeSubmissionResult.your_output}
                    </div>
                    <p className="text-sm font-medium mt-4 text-white">
                      Expected :
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                      {codeSubmissionResult.expected_output}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

type SubmissionsListProps = { data: any };

const SubmissionsList: React.FC<SubmissionsListProps> = ({ data }) => {
  console.log("dag", data);
  if (data == null) {
    return <div>No submissions</div>;
  }
  return (
    <div className="">
      <>
        <div className="grid grid-cols-7 text-sm font-inter text-right text-[#6d6d6d] py-[10px] px-4">
          <div className="col-span-2 text-left">Status</div>
          <div className="">Language</div>
          <div className="">Runtime</div>
          <div className="">Memory</div>
          <div className="col-span-2">Date</div>
        </div>
      </>
      {
        <Accordion variant="splitted" className="dark ">
          {data?.map((elem: any, i: any) => (
            <AccordionItem
              key={i}
              title={
                <div className="grid grid-cols-7 text-sm font-inter align-center justify-center text-right text-[#9c9c9c]   ">
                  <div className="col-span-2 text-left text-base font-bold ">
                    {elem.submissionStatus == "Accepted" ? (
                      <div className="text-green-500">Accepted</div>
                    ) : (
                      <div className="text-red-500">Failed</div>
                    )}
                  </div>
                  <div className="">{elem.data.lang}</div>
                  <div className="">{Math.round(elem.data.runtime)}ms</div>
                  <div className="">{Math.round(elem.data.memory)}MB</div>
                  <div className="col-span-2">{elem.data.submissionDate}</div>
                </div>
              }
              className="py-0"
              indicator={<div className=""></div>}
            >
              <div className="py-2">
                <Editor
                  height="100%"
                  width={"100%"}
                  language={elem.data.lang}
                  theme="vs-dark"
                  value={elem.codeBody}
                />
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      }
    </div>
  );
};

export default ProblemSubmission;
