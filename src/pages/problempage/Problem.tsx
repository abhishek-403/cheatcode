import React, { useState } from "react";
import { useParams } from "react-router";
import Split from "react-split";
import { useGetProblemQuery } from "../../store/services/problem";
import { ProblemPageSkeleton } from "../../utils/skeletons";
import CodeSection from "./CodeSection";
import ProblemDetails from "./ProblemDetails";
import { ProblemTabs } from "../../components/constants/problem-types";

type WorkSpaceProps = {
  problem: any;
};

const ProblemPage: React.FC<any> = () => {
  const questionId: { problemId: string } = useParams();
  const {
    data: problem,
    isLoading: problemLoading,
    error,
  } = useGetProblemQuery({
    problemId: questionId.problemId,
  });

  if (error) {
    return <div>Network failure</div>;
  }

  return (
    <div className="text-white z-10 w-full max-h-[calc(100vh)] overflow-hidden">
      {problemLoading ? (
        <ProblemPageSkeleton />
      ) : (
        <WorkSpace problem={problem.result} />
      )}
    </div>
  );
};

const WorkSpace: React.FC<WorkSpaceProps> = ({ problem }) => {
  const [activeProblemTab, setActiveProblemTab] = useState<ProblemTabs>(
    ProblemTabs.description
  );

  return (
    <div className="flex gap-2">
      <Split className="flex w-full" sizes={[50, 50]} minSize={40}>
        <div>
          <ProblemDetails
            setActiveTab={setActiveProblemTab}
            activeTab={activeProblemTab}
            problem={problem}
          />
        </div>
        <div>
          <CodeSection
            setActiveProblemTab={setActiveProblemTab}
            problem={problem}
          />
        </div>
      </Split>
    </div>
  );
};

export default ProblemPage;
