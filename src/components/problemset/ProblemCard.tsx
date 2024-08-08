import { IonIcon } from "@ionic/react";
import {
  checkmarkCircleSharp,
  codeSlashSharp,
  logoYoutube,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { ProblemSkeleton } from "../../utils/skeletons";
import {
  ProblemDifficulty,
  ProblemResponseType,
} from "../../common/problem-types";

type ProblemProps = {
  data: any;
  isLoading: boolean;
};

const ProblemCard = ({ data, isLoading }: ProblemProps) => {
  return (
    <>
      <div className="relative text-sm text-left text-gray-400 border-2 border-neutral-90 w-full mx-auto gap-[2px] bg-neutral-100">
        <div className="grid grid-cols-[180px_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)] text-md font-bold font-rubik text-gray-300 uppercase border-b border-neutral-90 text-center px-4 m-1">
          <div className=" py-3 font-medium">Title</div>
          <div className=" py-3 font-medium">Difficulty</div>
          <div className=" py-3 font-medium">Category</div>
          <div className=" py-3 font-medium">Company</div>
          <div className=" py-3 font-medium">Solution</div>
        </div>

        <div className="text-white bg-neutral-100 w-full rounded-lg">
          {isLoading ? (
            <ProblemSkeleton />
          ) : (
            data?.result.map((problem: ProblemResponseType, idx: number) => {
              const difficultyColor =
                problem.difficulty === ProblemDifficulty.easy
                  ? "text-green-500"
                  : problem.difficulty === ProblemDifficulty.medium
                  ? "text-yellow-500"
                  : "text-red-500";

              return (
                <div
                  className="grid grid-cols-[180px_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_1fr)]  p-4 border-b-2 border-neutral-90 cursor-pointer hover:bg-neutral-95 rounded transition-all duration-75 ease-in-out h-[60px] items-center text-center m-1 text-neutral-40"
                  key={idx}
                >
                  <Link
                    to={`/problem/${problem.id}`}
                    className="hover:text-secondary w-full flex"
                    target="_blank"
                  >
                    <div className="flex gap-6 items-center w-full">
                      <div>
                        {problem.isSolved ? (
                          <IonIcon
                            icon={checkmarkCircleSharp}
                            className="h-6 text-dark-green-s flex items-center justify-center w-6"
                          />
                        ) : (
                          <Link
                            to={`/problem/${problem.id}`}
                            target="_blank"
                            className="gap-2  flex items-center justify-center   text-base"
                          >
                            <IonIcon
                              icon={codeSlashSharp}
                              className=" h-6 w-6 mx-auto flex items-center justify-center  text-primary-60"
                            />
                          </Link>
                        )}
                      </div>
                      <div className="flex gap-1 text-neutral-0">
                        <div>{problem.problemNo + "."}</div>
                        <div>{problem.name}</div>
                      </div>
                    </div>
                  </Link>

                  <div className={`${difficultyColor}`}>
                    {problem.difficulty}
                  </div>
                  <div className=" ">{problem.category}</div>
                  <div className=" font-medium w-full flex items-center text-center justify-center">
                    Google
                  </div>
                  <div className=" text-center flex items-center">
                    {problem.videoLink ? (
                      <IonIcon
                        onClick={() => window.open(problem.videoLink, "_blank")}
                        icon={logoYoutube}
                        className="text-red-500 h-6 flex items-center justify-center w-full"
                      />
                    ) : (
                      <p className=" w-full">Coming soon</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ProblemCard;

{
  /* <div className="relative max-h-[75vh] overflow-x-auto mx-auto w-full  ">
        <table className="relative text-sm text-left text-gray-400 border-2 border-neutral-90  w-full mx-auto gap-[2px] bg-neutral-100  ">
          {
            <thead className="text-md font-bold font-rubik text-gray-300  uppercase border-b border-neutral-90 h-[50px]  ">
              <tr>
                <th className="px-8 py-3  font-medium w-[180px]">Title</th>
                <th className="px-6 py-3 w-0 font-medium">Difficulty</th>

                <th className="px-6 py-3 w-0 font-medium">Category</th>
                <th className="px-6 py-3 w-0 font-medium">Status</th>
                <th className="px-1 py-3 w-0 font-medium">Solution</th>
              </tr>
            </thead>
          }

          <tbody className="text-white bg-neutral-100 w-full rounded-lg ">
            {isLoading ? (
              <ProblemSkeleton />
            ) : (
              data?.result.map((problem: ProblemResponseType, idx: number) => {
                const difficulyColor =
                  problem.difficulty === ProblemDifficulty.easy
                    ? "text-green-500"
                    : problem.difficulty === ProblemDifficulty.medium
                    ? "text-yellow-500"
                    : "text-pink-500";
                return (
                  <tr
                    className="p-4 m-4 border-b-2 border-neutral-90  cursor-pointer hover:bg-neutral-95  rounded-lg transition-all duration-75 ease-in-out h-[60px]"
                    key={idx}
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="hover:text-secondary "
                        target="_blank"
                      >
                        <div className="flex gap-2 items-center w-full h-full">
                          <div className="">{problem.problemNo + "."} </div>
                          <div className="">{problem.name}</div>
                        </div>
                      </Link>
                    </td>
                    <td className={`px-6 py-4 ${difficulyColor} pl-10  `}>
                      {problem.difficulty}
                    </td>
                    <td className={"px-6 py-4 text-gray-300 pl-10 "}>
                      {problem.category}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap justify-start">
                      {problem.isSolved ? (
                        <IonIcon
                          icon={checkmarkCircleSharp}
                          className="flex items-center justify-center h-6 w-6  text-dark-green-s ml-4"
                        />
                      ) : (
                        <Link
                          to={`/problem/${problem.id}`}
                          target="_blank"
                          className="flex gap-2 items-center justify-start text-base  "
                        >
                          <IonIcon
                            icon={codeSlashSharp}
                            className="ml-4 h-6 w-6 text-primary-60"
                          />
                        </Link>
                      )}
                    </td>
                    <td className={"px-2 py-4"}>
                      {problem.videoLink ? (
                        <div className="text-left ">
                          <IonIcon
                            onClick={() =>
                              window.open(problem.videoLink, "_blank")
                            }
                            icon={logoYoutube}
                            className="flex justify-center items-center h-6 w-6 ml-4 text-red-500"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-400">Coming soon</p>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table> 

       
      </div> */
}
