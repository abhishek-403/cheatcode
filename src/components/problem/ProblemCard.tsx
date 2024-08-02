import { IonIcon } from "@ionic/react";
import {
  checkmarkCircleSharp,
  codeSlashSharp,
  logoYoutube,
} from "ionicons/icons";
import { Link } from "react-router-dom";
import { CustomSkeleton, ProblemSkeleton } from "../../utils/skeletons";
import { ProblemDifficulty, ProblemSchema } from "../constants/types";

type ProblemProps = {
  data: any;
  isLoading: boolean;
};

const ProblemCard = ({ data, isLoading }: ProblemProps) => {
  console.log(data);
  return (
    <>
      <div className="relative h-[75vh] overflow-x-auto mx-auto  ">
        <table className="relative text-sm text-left text-gray-400 border-2 border-[#2a2a2a]  w-full mx-auto gap-[2px]  ">
          {
            <thead className="text-md font-bold font-rubik text-gray-300  uppercase border-b border-[#2a2a2a]   ">
              <tr>
                <th className="px-6 py-3  font-medium w-[180px]">Title</th>
                <th className="px-6 py-3 w-0 font-medium">Difficulty</th>

                <th className="px-6 py-3 w-0 font-medium">Category</th>
                <th className="px-6 py-3 w-0 font-medium">Status</th>
                <th className="px-1 py-3 w-0 font-medium">Solution</th>
              </tr>
            </thead>
          }

          <tbody className="text-white  ">
            {isLoading ? (
              <ProblemSkeleton />
            ) : (
              data?.result.map((problem: ProblemSchema, idx: number) => {
                const difficulyColor =
                  problem.difficulty === ProblemDifficulty.easy
                    ? "text-green-500"
                    : problem.difficulty === ProblemDifficulty.medium
                    ? "text-yellow-500"
                    : "text-pink-500";
                return (
                  <tr
                    className={`hover:bg-neutral-90 b-[2px] border-b border-neutral-90  cursor-pointer transition-all  w-[180px] `}
                    key={idx}
                  >
                    <Link
                      to={`/problem/${problem.id}`}
                      className="hover:text-[#5eb6ff]"
                      target="_blank"
                    >
                      <td className="px-6 py-4 ">
                        <div className="flex gap-2">
                          <div className="">{problem.problemNo + "."} </div>
                          <div className="">{problem.name}</div>
                        </div>
                      </td>
                    </Link>
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
      </div>
    </>
  );
};

export default ProblemCard;
