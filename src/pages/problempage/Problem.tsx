import React, { useState } from "react";
import Split from "react-split";
import ProblemDetails from "./ProblemDetails";
import { twoSum } from "../../components/constants/constants";
import CodeSection from "./CodeSection";

type ProblemPageProps = {};
type WorkSpaceProps = {
  problem: any;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }: any) => {
  const [problem, setProblem] = useState();

  return (
    <div className="text-white z-10 w-full max-h-[calc(100vh-70px)] overflow-hidden">
      <WorkSpace problem={twoSum} />
    </div>
  );
};

const WorkSpace: React.FC<WorkSpaceProps> = ({ problem }) => {
  return (
    <div className="flex gap-2">
      {/* <Navbar /> */}
      <Split
        className="flex"
        // sizes={[50, 50]}
        // minSize={100}
      >
        <div>
          <ProblemDetails problem={problem} />
        </div>
        <div className="">
          <CodeSection problem={problem} />
        </div>
      </Split>
    </div>
  );
};

export default ProblemPage;
