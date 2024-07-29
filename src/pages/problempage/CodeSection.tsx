import { IonIcon } from "@ionic/react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { closeOutline, scanOutline, settingsOutline } from "ionicons/icons";
import { SetStateAction, useEffect, useState } from "react";
import Split from "react-split";
import {
  checkOutputResponse,
  LANGUAGE_MAPPING,
  ProblemDetailsProps,
  ResponseStatusType,
  SubmissionStatusType,
  SUPPORTED_LANGUAGES_ARRAY,
} from "../../components/constants/types";
import CodeEditorSettingModal from "../../components/modals/CodeEditorSettingModal";
import TestCases, {
  TestCasesResult,
} from "../../components/problempage/TestCases";
import useLocalStorage from "../../hooks/useLocation";
import { LanguageDropdownComponent } from "../../components/custom-ui/dropdown";
import { PrimaryButton } from "../../components/custom-ui/button";
import { Button } from "@nextui-org/react";

type CodeSectionProps = {
  problem: ProblemDetailsProps;
};

const CodeSection: React.FC<CodeSectionProps> = ({ problem }) => {
  let [userCode, setUserCode] = useState<string>("");

  const [resultSummary, setResultSummary] = useState<
    | {
        submission_status: SubmissionStatusType;
        detailedInfo: checkOutputResponse[];
      }
    | null
    | ResponseStatusType.Error
  >(null);
  // const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    key: string;
    value: string;
  }>(SUPPORTED_LANGUAGES_ARRAY[0]);
  const [settings, setSettings] = useState<any>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
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

  useEffect(() => {
    setUserCode(problem?.infoPage.starterCode[selectedLanguage.key]);
  }, [problem, selectedLanguage]);

  async function handleRun() {
    try {
      setisLoading(true);
      setIsResultActive(true);
      const res = await axios.post(
        `http://localhost:4000/api/v1/problem/${problem.id}/check`,
        {
          sourceCode: userCode,
          languageId: selectedLanguage.key,
        }
      );
      if (res.data.status === ResponseStatusType.Error) {
        setResultSummary(res.data.status);
      } else {
        setResultSummary(res.data.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
  }
  function handleSubmit() {}

  return (
    <div className="flex flex-col relative overflow-hidden text-white ">
      <PreferenceNav
        settings={settings}
        setSettings={setSettings}
        setSelectedLanguage={setSelectedLanguage}
      />
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
              language={selectedLanguage.key}
              theme="vs-dark"
              value={userCode}
              onChange={(t) => setUserCode(t ?? "")}
              options={{ fontSize: settings.fontSize }}
            />
          </div>
        </div>

        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6 cursor-pointer border-b border-neutral-80">
            <div
              onClick={() => setIsResultActive(false)}
              className="relative flex h-full flex-col justify-center "
            >
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              {!isResultActive && (
                <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
              )}
            </div>
            <div
              onClick={() => setIsResultActive(true)}
              className={`relative flex h-full flex-col justify-center`}
            >
              <div className="text-sm font-medium leading-5 text-white">
                Testcases result
              </div>
              {isResultActive && (
                <hr
                  className={`absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white`}
                />
              )}
            </div>
          </div>

          <div className="pb-14 relative">
            {isResultActive ? (
              <TestCasesResult
                resultSummary={resultSummary}
                isLoading={isLoading}
                problem={problem}
              />
            ) : (
              <TestCases problem={problem} />
            )}
          </div>
          <div className=" absolute bg-dark-fill  w-full bottom-0 right-0 px-4 pb-4 ">
            <EditorFooter
              handleSubmit={handleSubmit}
              handleRun={handleRun}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Split>
    </div>
  );
};

type PreferenceNavProps = {
  settings: any;
  setSettings: any;
  setSelectedLanguage: React.Dispatch<SetStateAction<any>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
  setSelectedLanguage,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="relative flex items-center justify-between  px-5 h-11 w-full ">
      <div className="flex items-center border border-neutral-80 rounded-lg bg-neutral-80">
        <LanguageDropdownComponent
          items={SUPPORTED_LANGUAGES_ARRAY}
          setSelectedValue={setSelectedLanguage}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="group"
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <IonIcon icon={settingsOutline} />
          </div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? (
              <IonIcon icon={scanOutline} />
            ) : (
              <IonIcon icon={closeOutline} />
            )}
          </div>
        </button>
      </div>
      {settings.settingsModalIsOpen && (
        <CodeEditorSettingModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};

type EditorFooterProps = {
  handleSubmit: () => void;
  handleRun: () => void;
  isLoading: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({
  handleSubmit,
  handleRun,
  isLoading,
}) => {
  return (
    <div className="flex  z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="ml-auto flex items-center space-x-4">
          {/* <button
            className="px-3 py-1.5 text-base font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-neutral-80  hover:bg-neutral-70 text-dark-label-2 rounded-lg"
            onClick={handleRun}
          >
            Run
          </button> */}
          <Button
            className="px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-primary-100 font-inter hover:bg-green-3 rounded-xl"
            // onClick={handleSubmit}
            onClick={handleRun}
            disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeSection;
