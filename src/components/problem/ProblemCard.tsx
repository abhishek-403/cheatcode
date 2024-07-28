import { Link } from "react-router-dom";
import { problem } from "../constants/constants";
import { ProblemSchema } from "../constants/types";
import { useIonRouter } from "@ionic/react";

export default function ProblemCard() {
  //   const [problem, setProblem] = useState([]);

  //   async function fetchProblems() {
  //     try {
  //       const res = await axiosClient.get(
  //         "http://localhost:8080/api/v1/user/getallproblems"
  //       );

  //       setProblem(res.data.result.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   useEffect(() => {
  //     fetchProblems();
  //   }, []);
  const navigate = useIonRouter();
  return (
    <>
      <tbody className="text-white  ">
        {problem?.map((problem: ProblemSchema, idx: number) => {
          const difficulyColor =
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-pink-500";
          return (
            <tr
              className={`hover:bg-[#2222226b] b-[2px] border-b border-[#1a1a1a] hover:text-[#5eb6ff] cursor-pointer  `}
              key={idx}
              onClick={() => navigate.push(`/problem/${problem.id}`,"root","replace")}
            >
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <div className="">{problem.problemNo + "."} </div>
                  <div className="">{problem.name}</div>
                </div>
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {problem.difficulty}
              </td>
              <td className={"px-6 py-4 text-gray-300"}>{problem.category}</td>
              <td className={"px-6 py-4"}>
                {problem.videoLink ? (
                  <div className="text-left ">Y</div>
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
              <td className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                {problem.status && <div>{problem.status}</div>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
