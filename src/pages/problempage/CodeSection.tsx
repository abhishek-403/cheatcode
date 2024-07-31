import { IonIcon } from "@ionic/react";
import Editor from "@monaco-editor/react";
import { Button, cn } from "@nextui-org/react";
import axios from "axios";
import {
  closeOutline,
  refreshOutline,
  scanOutline,
  settingsOutline,
} from "ionicons/icons";
import { SetStateAction, useEffect, useState } from "react";
import Split from "react-split";
import {
  checkOutputResponse,
  ProblemDetailsProps,
  ResponseStatusType,
  SubmissionStatusType,
  SUPPORTED_LANGUAGES_ARRAY,
} from "../../components/constants/types";
import { LanguageDropdownComponent } from "../../components/custom-ui/dropdown";
import CodeEditorSettingModal from "../../components/modals/CodeEditorSettingModal";
import TestCases, {
  TestCasesResult,
} from "../../components/problempage/TestCases";
import useLocalStorage from "../../hooks/useLocation";
import { getUser } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useSignInWithGoogleMutation } from "../../store/services/auth";
import Spinner from "../../components/custom-ui/loading";
import { useRunProblemMutation } from "../../store/services/problem";

type CodeSectionProps = {
  problem: ProblemDetailsProps;
};

const CodeSection: React.FC<CodeSectionProps> = ({ problem }) => {
  const [userCode, setUserCode] = useState<string>("");

  const [resultSummary, setResultSummary] = useState<
    | {
        submission_status: SubmissionStatusType;
        detailedInfo: checkOutputResponse[];
      }
    | null
    | ResponseStatusType.Error
  >(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    key: string;
    value: string;
  }>(SUPPORTED_LANGUAGES_ARRAY[0]);
  const user = getUser();

  const [settings, setSettings] = useState<any>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    wordWrap: true,
  });

  const [runProblem, { isLoading: runLoading, error }] =
    useRunProblemMutation();

  useEffect(() => {
    setUserCode(problem?.infoPage.starterCode[selectedLanguage.key]);
  }, [problem, selectedLanguage]);

  async function handleRun() {
    try {
      if (!user.isAuthenticated) {
        toast.error("Login to submit");
        return;
      }

      setisLoading(true);
      setIsResultActive(true);
      // const res = await axios.post(
      //   `http://localhost:4000/api/v1/problem/${problem.id}/check`,
      //   {
      //     sourceCode: userCode,
      //     languageId: selectedLanguage.key,
      //   }
      // );
      const res = await runProblem({
        sourceCode: userCode,
        languageId: selectedLanguage.key,
        problemId: problem.id,
      });
      
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
  function resetCode() {
    setUserCode(problem?.infoPage.starterCode[selectedLanguage.key]);
  }
  return (
    <div className="flex flex-col relative overflow-hidden text-white h-full ">
      <PreferenceNav
        settings={settings}
        setSettings={setSettings}
        setSelectedLanguage={setSelectedLanguage}
        resetCode={resetCode}
      />
      <Split
        className="h-[calc(100vh-var(--navbar-height))]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={20}
      >
        <div className="flex flex-col overflow-auto  rounded relative min-h-[10vh] min-w-[50vw]">
          <div className="overflow-auto h-full  ">
            <Editor
              height="100%"
              width={"100%"}
              language={selectedLanguage.key}
              theme="vs-dark"
              value={userCode}
              onChange={(t) => setUserCode(t ?? "")}
              options={{
                fontSize: settings.fontSize,
                wordWrap: settings.wordWrap,
              }}
            />
          </div>
        </div>

        <div className="w-full px-5 overflow-auto h-full">
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

          <div className="pb-12 relative">
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
          <div className="bg-neutral-90 w-full absolute px-4 bottom-0 rounded-lg ">
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
  resetCode: () => void;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
  setSelectedLanguage,
  resetCode,
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
    <div className="relative flex items-center justify-between  px-5 h-11 w-full  ">
      <div className="flex items-center border border-neutral-80 rounded-lg bg-neutral-80">
        <LanguageDropdownComponent
          items={SUPPORTED_LANGUAGES_ARRAY}
          setSelectedValue={setSelectedLanguage}
        />
      </div>

      <div className="flex items-center gap-5 ">
        <div
          onClick={() =>
            setSettings({ ...settings, settingsModalIsOpen: true })
          }
          className="text-neutral-30 cursor-pointer hover:text-neutral-10 text-xl"
          title="Settings"
        >
          <IonIcon
            icon={settingsOutline}
            className="flex items-center justify-center"
          />
        </div>

        <div
          onClick={handleFullScreen}
          className=" text-neutral-30 cursor-pointer hover:text-neutral-10 text-xl"
          title={`${isFullScreen ? "Minimize" : "Maximize"}`}
        >
          {!isFullScreen ? (
            <IonIcon
              icon={scanOutline}
              className="flex items-center justify-center"
            />
          ) : (
            <IonIcon
              icon={closeOutline}
              className="flex items-center justify-center"
            />
          )}
        </div>
        <div
          onClick={resetCode}
          className="text-neutral-30 cursor-pointer hover:text-neutral-10 text-xl"
          title="Reset"
        >
          <IonIcon
            icon={refreshOutline}
            className="flex items-center justify-center"
          />
        </div>
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
  const { isAuthenticated, isLoading: authLoading } = getUser();
  const [singInWithGoogle, { isLoading: signinLoading }] =
    useSignInWithGoogleMutation();
  async function handleSignIn() {
    try {
      if (signinLoading) return;
      const { error } = await singInWithGoogle();
      if (error) throw error;
      toast.success("Logged In");
    } catch (e) {
      toast.error("Internal Error");
      console.log(e);
    }
  }
  return (
    <div className="flex items-center py-3 pr-10 w-full justify-end">
      {/* <button
            className="px-3 py-1.5 text-base font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-neutral-80  hover:bg-neutral-70 text-dark-label-2 rounded-lg"
            onClick={handleRun}
          >
            Run
          </button> */}
      {isAuthenticated ? (
        <Button
          className={cn(
            "px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-primary-100 font-inter hover:bg-green-3 rounded-xl",
            isLoading && "opacity-70"
          )}
          onClick={handleRun}
          disabled={isLoading}
        >
          Submit
        </Button>
      ) : (
        <Button
          className={cn(
            "px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-neutral-80 font-inter hover:bg-green-3 rounded-xl",
            signinLoading && "opacity-70"
          )}
          disabled={signinLoading}
        >
          {authLoading ? (
            <Spinner size={8} variant={"dots"} />
          ) : (
            <li
              onClick={handleSignIn}
              className="flex items-center justify-center bg-neutral-80 px-4 py-1 rounded-lg text-primary-60"
            >
              Login
            </li>
          )}
        </Button>
      )}
    </div>
  );
};

export default CodeSection;
