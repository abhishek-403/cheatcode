import { useCallback, useState } from "react";
import useLocalStorage from "../../hooks/useLocation";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Split from "react-split";
import TestCases, {
  TestCasesResult,
} from "../../components/problempage/TestCases";

type CodeSectionProps = {
  problem: any;
};

const CodeSection: React.FC<CodeSectionProps> = ({ problem }) => {
  let [userCode, setUserCode] = useState<string>("");
  const [resultSummary, setResultSummary] = useState(null);
  // const [isResultActive, setIsResultActive] = useState<boolean>(false);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [isResultActive, setIsResultActive] = useState<boolean>(false);

  const [settings, setSettings] = useState({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });
  // const setCodeSubmissionResult = useSetRecoilState(CodeSubmissionResult);
  // const setWorkSpaceActiveTab = useSetRecoilState(WorkSpaceActiveTab);
  // async function handleSubmit() {
  //   try {
  //     if (!getItem("accessToken")) {
  //       toast.error("Login to submit");
  //       return;
  //     }

  //     setWorkSpaceActiveTab("Submissions");
  //     await handleRun();

  //     const res = await axiosClient.post(
  //       `/problems/65c352b084a0a5097c027e19/submit`,
  //       { userCode }
  //     );

  //     console.log(res.data);
  //     setCodeSubmissionResult(res.data.result);
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // }
  // async function handleRun() {
  //   try {
  //     if (typeof userCode.split("return")[1] != typeof Array) {
  //       console.log("h", userCode.split("return")[1]);
  //       return;
  //     }
  //     const res = await axiosClient.post(
  //       `/problems/65c352b084a0a5097c027e19/check`,
  //       { userCode }
  //     );

  //     if (res.data.status === "success") {
  //       setResultSummary(res.data.result);
  //     }
  //     setIsResultActive(true);
  //     console.log(res.data);
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // }

  function handleRun() {}
  function handleSubmit() {}

  return (
    <div className="flex flex-col relative overflow-hidden text-white ">
      {/* <PreferenceNav settings={settings} setSettings={setSettings} /> */}
      <Split
        className="h-[calc(100vh-100px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="flex flex-col overflow-auto  rounded relative min-h-[10vh] min-w-[50vw]">
          <div className="overflow-auto h-full  ">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={problem?.starterCode}
              onChange={(t) => setUserCode(t ?? "")}
              options={{ fontSize: settings.fontSize }}
            />
          </div>
          <div>
            <EditorFooter handleSubmit={handleSubmit} handleRun={handleRun} />
          </div>
        </div>

        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6 cursor-pointer">
            <div className="relative flex h-full flex-col justify-center ">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
            </div>
            <div className={`relative flex h-full flex-col justify-center`}>
              <div className="text-sm font-medium leading-5 text-white">
                Testcases result
              </div>
            </div>
          </div>

          {isResultActive ? (
            <TestCasesResult resultSummary={resultSummary} problem={problem} />
          ) : (
            <TestCases problem={problem} />
          )}
        </div>
      </Split>
    </div>
  );
};

type EditorFooterProps = {
  handleSubmit: () => void;
  handleRun: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({
  handleSubmit,
  handleRun,
}) => {
  return (
    <div className="flex absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeSection;
