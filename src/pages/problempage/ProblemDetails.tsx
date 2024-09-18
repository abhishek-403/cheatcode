import React, { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { cn, Image } from "@nextui-org/react";
import ProblemSubmission from "./ProblemSubmissions";
import {
  ProblemDetailsProps,
  ProblemDifficulty,
} from "../../common/problem-types";
import { ProblemTabs } from "../../components/constants/problem-types";

type ProblemsDetailsProps = {
  problem: ProblemDetailsProps;
  activeTab: ProblemTabs;
  setActiveTab: React.Dispatch<SetStateAction<ProblemTabs>>;
};

const ProblemDetails: React.FC<ProblemsDetailsProps> = ({
  problem,
  activeTab,
  setActiveTab,
}) => {
  function displayTab() {
    switch (activeTab) {
      case ProblemTabs.description:
        return <ProblemsDescription problem={problem} />;
      case ProblemTabs.submissions:
        return <ProblemSubmission problemId={problem.id} />;
    }
  }

  return (
    <div>
      <div className="flex gap-4 py-2 w-full items-center px-4 h-[var(--problem-header-height)] font-inter  border-b border-[#2a2a2a] text-white overflow-hidden">
        <Link
          to={"/"}
          className="flex gap-2 items-center cursor-pointer justify-center"
        >
          <Image
            src="./seclogo.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </Link>
        <button
          onClick={() => setActiveTab(ProblemTabs.description)}
          className={`${
            activeTab == ProblemTabs.description
              ? "bg-neutral-80 "
              : "text-neutral-30"
          }  rounded text-sm cursor-pointer hover:text-neutral-40 px-3 py-2 transition-all`}
        >
          {ProblemTabs.description}
        </button>
        <button
          onClick={() => setActiveTab(ProblemTabs.submissions)}
          className={`font-inter  ${
            activeTab == ProblemTabs.submissions
              ? "bg-neutral-80"
              : "text-neutral-30"
          }  rounded text-sm cursor-pointer hover:text-neutral-40 px-3 py-2`}
        >
          {ProblemTabs.submissions}
        </button>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-var(--problem-header-height))] scrollbar-hide overflow-y-auto w-full">
        {displayTab()}
      </div>
    </div>
  );
};

type ProblemsDescriptionProps = {
  problem: ProblemDetailsProps;
};

const ProblemsDescription: React.FC<ProblemsDescriptionProps> = ({
  problem,
}) => {
  const difficulyColor =
    problem.difficulty === ProblemDifficulty.easy
      ? "text-green-500 bg-green-200"
      : problem.difficulty === ProblemDifficulty.medium
      ? "text-yellow-500 bg-yellow-200"
      : "text-red-500 bg-red-300";
  return (
    <div className="px-5 w-full font-inter">
      <div className="">
        <div className="flex gap-2 w-full items-center py-2 px-1">
          <div className="flex mr-2 text-xl text-white font-semibold">
            {problem?.problemNo + ". " + problem?.name}
          </div>
          <div
            className={cn(
              "text-xs ml-auto px-4 rounded-full bg-opacity-20 py-1",
              difficulyColor
            )}
          >
            {problem?.difficulty}
          </div>
        </div>

        <div className="text-white text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: problem?.infoPage.problemStatement,
            }}
          />
        </div>

        <div className="mt-4">
          {problem?.infoPage.examples?.map((example: any, index: any) => (
            <div key={example.id}>
              <p className="font-medium text-white ">Example {index + 1}: </p>
              {example.img && <img src={example.img} alt="" className="mt-3" />}
              <div className="example-card">
                <pre>
                  <strong className="text-white">Input: </strong>
                  {example.inputText}
                  <br />
                  <strong>Output: </strong>
                  {example.outputText} <br />
                  {example.explanation && (
                    <>
                      <strong>Explanation:</strong> {example.explanation}
                    </>
                  )}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 pb-4">
          <div className="text-white text-sm font-medium">Constraints:</div>
          <ul className="text-white ml-5 list-disc ">
            <div
              dangerouslySetInnerHTML={{
                __html: problem?.infoPage.constraints,
              }}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
