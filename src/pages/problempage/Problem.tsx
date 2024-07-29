import React, { useEffect, useState } from "react";
import Split from "react-split";
import ProblemDetails from "./ProblemDetails";
import CodeSection from "./CodeSection";
import axios from "axios";
import { useParams } from "react-router";

type ProblemPageProps = {};
type WorkSpaceProps = {
  problem: any;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }: any) => {
  const [problem, setProblem] = useState();
  const questionId: { problemId: string } = useParams();
  async function fetchProblem() {
    const data = await axios.get(
      `http://localhost:4000/api/v1/problem/${questionId.problemId}`
    );

    setProblem(data.data.result);
  }
  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className="text-white z-10 w-full max-h-[calc(100vh-70px)] overflow-hidden">
      <WorkSpace problem={problem} />
    </div>
  );
};

const WorkSpace: React.FC<WorkSpaceProps> = ({ problem }) => {
  return (
    <div className="flex gap-2">
      {/* <Navbar /> */}
      <Split
        className="flex w-full"
        sizes={[50, 50]}
        minSize={40}
      >
        <div>
          <ProblemDetails problem={problem} />
        </div>
        <div >
          <CodeSection problem={problem} />
        </div>
      </Split>
    </div>
  );
};

export default ProblemPage;
