import { ProblemDetailsProps } from "../../components/constants/types";

type ProblemsDetailsProps = {
  problem: any;
};

const ProblemDetails: React.FC<ProblemsDetailsProps> = ({ problem }) => {
  //   const [activeTab, setActiveTab] = useRecoilState(WorkSpaceActiveTab);
  return (
    <div>
      <div className="flex gap-2 py-2 w-full h-[50px] items-center px-4   border-b border-[#2a2a2a] text-white overflow-y-hidden">
        <button
          //   onClick={() => setActiveTab("Description")}
          className={` font-inter rounded text-sm cursor-pointer hover:text-[#cecece] px-3 py-2 `}
        >
          Description
        </button>
        <button
          //   onClick={() => setActiveTab("Submissions")}
          className={`font-inter  rounded text-sm cursor-pointer hover:text-[#cecece] px-3 py-2`}
        >
          Submissions
        </button>
      </div>
      <ProblemsDescription problem={problem} />
      {/* <div>
        {activeTab == "Description" ? (
        ) : (
          <Submissions />
        )}
      </div> */}
    </div>
  );
};


type ProblemsDescriptionProps = {
  problem: ProblemDetailsProps;
};

const ProblemsDescription: React.FC<ProblemsDescriptionProps> = ({
  problem,
}) => {
  return (
    <div className="">
      <div className="flex px-0 py-4 h-[calc(100vh-120px)] overflow-y-auto w-full">
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
                  __html: problem?.problemStatement,
                }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem?.examples?.map((example: any, index: any) => (
                <div key={example.id}>
                  <p className="font-medium text-white ">
                    Example {index + 1}:{" "}
                  </p>
                  {example.img && (
                    <img src={example.img} alt="" className="mt-3" />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong>Output:</strong>
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
                    __html: problem?.constraints,
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
