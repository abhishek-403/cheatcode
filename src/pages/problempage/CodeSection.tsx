import { IonIcon } from "@ionic/react";
import Editor from "@monaco-editor/react";
import { Button, cn } from "@nextui-org/react";
import {
  contractOutline,
  expandOutline,
  readerOutline,
  refreshOutline,
  settingsOutline,
} from "ionicons/icons";
import { SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Split from "react-split";

// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  ProblemDetailsProps,
  SUPPORTED_LANGUAGES_ARRAY,
} from "../../common/problem-types";
import {
  EDITOR_FONT_SIZES_OPTIONS,
  LS_SETTINGS,
} from "../../components/constants/constants";
import {
  ICheckResultSummary,
  ProblemTabs,
} from "../../components/constants/problem-types";
import { LanguageDropdownComponent } from "../../components/custom-ui/dropdown";
import Spinner from "../../components/custom-ui/loading";
import CodeEditorSettingModal from "../../components/modals/CodeEditorSettingModal";
import TestCases, {
  TestCasesResult,
} from "../../components/problempage/TestCases";
import { isUserAuthenticated } from "../../hooks/useAuthState";
import useLocalStorage from "../../hooks/useLocation";
import { useSignInWithGoogleMutation } from "../../store/services/auth";
import {
  useRunProblemMutation,
  useSubmitProblemMutation,
} from "../../store/services/problem";
import {
  setSubmissionData,
  setSubmissionLoading,
} from "../../store/slices/workspaceSlice";
import { CustomSkeleton } from "../../utils/skeletons";

type CodeSectionProps = {
  problem: ProblemDetailsProps;
  setActiveProblemTab: React.Dispatch<SetStateAction<ProblemTabs>>;
};

const CodeSection: React.FC<CodeSectionProps> = ({
  problem,
  setActiveProblemTab,
}) => {
  const [userCode, setUserCode] = useState<string>("");

  const [resultSummary, setResultSummary] = useState<ICheckResultSummary>(null);

  const [fontSize, setFontSize] = useLocalStorage(
    LS_SETTINGS.fontSize,
    EDITOR_FONT_SIZES_OPTIONS[4]
  );
  const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<{
    key: string;
    value: string;
  }>(SUPPORTED_LANGUAGES_ARRAY[0]);
  const user = isUserAuthenticated();

  const [settings, setSettings] = useState<any>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    wordWrap: true,
  });

  const [runProblem, { isLoading: runLoading }] = useRunProblemMutation();
  const [submitProblem, { isLoading: submitLoading }] =
    useSubmitProblemMutation();
  const dispatch = useDispatch();

  const editorRef = useRef<any | null>(null);

  function handleIndent() {
    const editor = editorRef.current;
    if (editor) {
      editor.getAction("editor.action.formatDocument")!.run();
    }
  }
  useEffect(() => {
    setUserCode(problem?.infoPage.starterCode[selectedLanguage.key]);
  }, [problem, selectedLanguage]);

  async function handleRun() {
    try {
      if (!user.isAuthenticated) {
        toast.error("Login to submit");
        return;
      }

      setIsResultActive(true);
      const res = await runProblem({
        sourceCode: userCode,
        languageId: selectedLanguage.key,
        problemId: problem.id,
      });

      setResultSummary({ status: res.data.status, data: res.data.result });
    } catch (e) {}
  }
  async function handleSubmit() {
    try {
      if (!user.isAuthenticated) {
        toast.error("Login to submit");
        return;
      }

      dispatch(
        setSubmissionLoading({
          submissionData: null,
          isLoading: true,
        })
      );
      setActiveProblemTab(ProblemTabs.submissions);
      const res = await submitProblem({
        sourceCode: userCode,
        languageId: selectedLanguage.key,
        problemId: problem.id,
      });
      dispatch(
        setSubmissionData({
          submissionData: res.data,
          isLoading: false,
        })
      );
    } catch (e) {}
  }
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
        indentCode={handleIndent}
      />
      <Split
        className="h-[calc(100vh-var(--navbar-height))]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={80}
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
                smoothScrolling: true,
                automaticLayout: true,
              }}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
              loading={
                <div className="w-full h-full">
                  <CustomSkeleton className="h-full" />
                </div>
              }
            />
          </div>
        </div>

        <div className="  overflow-idden w-full  h-full overflow-y-auto">
          <div className="flex h-10 px-4 items-center space-x-6 cursor-pointer border-b border-neutral-80 w-full  absolute bg-neutral-90 opacity-100 z-[10]">
            <div
              onClick={() => setIsResultActive(false)}
              className="relative flex h-full flex-col justify-center"
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

          <div className="pb-12 relative mt-12 px-4">
            {isResultActive ? (
              <TestCasesResult
                resultSummary={resultSummary}
                isLoading={runLoading}
                problem={problem}
              />
            ) : (
              <TestCases problem={problem} />
            )}
          </div>
          <div className="bg-neutral-90 border w-full mb-1  border-neutral-80 absolute px-4 bottom-0 rounded-lg ">
            <EditorFooter
              handleSubmit={handleSubmit}
              handleRun={handleRun}
              isLoading={runLoading || submitLoading}
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
  indentCode: () => void;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
  setSelectedLanguage,
  resetCode,
  indentCode,
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
          onClick={() => indentCode()}
          className="text-neutral-30 cursor-pointer hover:text-neutral-10 text-xl"
          title="Format"
        >
          <IonIcon
            icon={readerOutline}
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
              icon={expandOutline}
              className="flex items-center justify-center"
            />
          ) : (
            <IonIcon
              icon={contractOutline}
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
  const { isAuthenticated, isLoading: fetchAuthLoading } =
    isUserAuthenticated();
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
    }
  }
  return (
    <div className="flex items-center py-2 w-full  ">
      {isAuthenticated ? (
        <div className="w-full h-[40px] flex items-center">
          {isLoading ? (
            <div className="gap-3 ml-auto py-3 flex items-center justify-center w-fit bg-neutral-80 px-14  rounded-lg text-primary-60">
              <Spinner variant="dots" size={12} />
            </div>
          ) : (
            <div className="flex gap-3 items-center justify-end w-full">
              <Button
                className={cn(
                  "px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-neutral-80 font-inter hover:bg-green-3 rounded-xl",
                  isLoading && "opacity-70"
                )}
                onClick={handleRun}
                disabled={isLoading}
              >
                Run
              </Button>
              <Button
                className={cn(
                  "px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-primary-100 font-inter hover:bg-green-3 rounded-xl",
                  isLoading && "opacity-70"
                )}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button
          className={cn(
            "px-4 py-2 font-medium items-center transition-all focus:outline-none inline-flex text-base text-white bg-neutral-80 font-inter hover:bg-green-3 rounded-xl justify-end w-fit ml-auto h-[40px] ",
            signinLoading && "opacity-70"
          )}
          disabled={signinLoading}
        >
          {fetchAuthLoading || signinLoading ? (
            <Spinner
              size={8}
              variant={"dots"}
              className="w-[75px] flex items-center justify-center"
            />
          ) : (
            <div
              onClick={handleSignIn}
              className="flex items-center justify-center bg-neutral-80 px-4 py-1 rounded-lg text-primary-60"
            >
              Login
            </div>
          )}
        </Button>
      )}
    </div>
  );
};

export default CodeSection;
