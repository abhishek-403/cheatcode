import React, { useState } from "react";
import { ProblemDetailsProps } from "../../components/constants/types";
import { Link } from "react-router-dom";
import { Image } from "@nextui-org/react";

type ProblemsDetailsProps = {
  problem: any;
};
enum ProblemTabs {
  description = "Description",
  submissions = "Submissions",
}
const ProblemDetails: React.FC<ProblemsDetailsProps> = ({ problem }) => {
  const [activeTab, setActiveTab] = useState<ProblemTabs>(
    ProblemTabs.description
  );

  function displayTab() {
    switch (activeTab) {
      case ProblemTabs.description:
        return <ProblemsDescription problem={problem} />;
      case ProblemTabs.submissions:
        return (
          <div className="py-10 w-full flex items-center justify-center">
            Coming Soon
          </div>
        );
    }
  }

  return (
    <div>
      <div className="flex gap-4 py-2 w-full items-center px-4 h-[var(--problem-header-height)]   border-b border-[#2a2a2a] text-white overflow-hidden">
        <Link
          to={"/"}
          className="flex gap-2 items-center cursor-pointer justify-center"
        >
          <Image
            src="./logo.png"
            width={30}
            height={30}
            alt="Picture of the author"
          />
        </Link>
        <button
          onClick={() => setActiveTab(ProblemTabs.description)}
          className={`${
            activeTab == ProblemTabs.description
              ? "bg-neutral-80 "
              : "text-[#848484]"
          } font-inter rounded text-sm cursor-pointer hover:text-[#cecece] px-3 py-2 `}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab(ProblemTabs.submissions)}
          className={`font-inter  ${
            activeTab == ProblemTabs.submissions
              ? "bg-neutral-80"
              : "text-[#848484]"
          }  rounded text-sm cursor-pointer hover:text-[#cecece] px-3 py-2`}
        >
          Submissions
        </button>
      </div>
      <div>
        {/* {activeTab == "Description" ? (
          <ProblemsDescription problem={problem} />
        ) : (
          <Submissions />
        )} */}
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
  // return (
  //   <div className="w-full p-4">
  //     <Markdown remarkPlugins={[remarkGfm]}>{des}</Markdown>
  //   </div>
  // );
  return (
    <div className="">
      <div className="flex px-0 py-4 h-[calc(100vh-var(--problem-header-height))] scrollbar-hide overflow-y-auto w-full">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem?.problemNo + ". " + problem?.name}
              </div>
            </div>

            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: problem?.infoPage.problemStatement,
                }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem?.infoPage.examples?.map((example: any, index: any) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{" "}
                  </p>
                  {example.img && (
                    <img src={example.img} alt="" className="mt-3" />
                  )}
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

            {/* Constraints */}
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
      </div>
    </div>
  );
};

export default ProblemDetails;
