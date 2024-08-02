import { useEffect, useState } from "react";
import ProblemCard from "../components/problem/ProblemCard";
import Sheets from "../components/problem/Sheets";
import {
  useGetAllSheetsQuery,
  useGetProblemsBySheetIdQuery,
} from "../store/services/problem";
import { CustomSkeleton } from "../utils/skeletons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function ProblemSet() {
  const {
    data: sheetsData,
    isLoading: sheetsLoading,
    refetch: refetchSheets,
  } = useGetAllSheetsQuery();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const {
    data: problemsArray,
    isLoading: problemsLoading,
    refetch: refetchProblems,
  } = useGetProblemsBySheetIdQuery(
    { sheetId: activeSheet ?? "" },
    { skip: !activeSheet }
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        refetchProblems();
        refetchSheets();
      }
    });

    return () => unsubscribe();
  }, [refetchSheets, refetchProblems]);
  useEffect(() => {
    if (!sheetsLoading && sheetsData?.result?.length > 0) {
      setActiveSheet(sheetsData.result[0]._id);
    }
  }, [sheetsData, sheetsLoading]);

  return (
    <div className="text-white px-[40px] mt-8">
      <div className="flex gap-5 justify-between">
        <div className="w-[25%] h-fit  bg-black border-x border-[#2a2a2a] rounded">
          <Sheets
            data={sheetsData}
            isLoading={sheetsLoading}
            activeSheet={activeSheet}
            setActiveSheet={setActiveSheet}
          />
        </div>
        <main className="w-[75%] overflow-auto ">
          <div className="flex items-center justify-center font-salsa text-3xl py-3 rounded border border-[#2a2a2a] bg-gradient-to-r from-[#88ff4c] via-[#61edff] to-[#966fe5] bg-clip-text text-transparent font-bold ">
            {sheetsLoading || problemsLoading ? (
              <CustomSkeleton width={300} height={30} />
            ) : (
              sheetsData?.result?.find(
                (sheet: any) => sheet._id === activeSheet
              )?.name ?? ""
            )}
          </div>

          <ProblemCard
            data={problemsArray}
            isLoading={problemsLoading || sheetsLoading}
          />
        </main>
      </div>
    </div>
  );
}

// <div className="text-sm text-gray-200">
// <table className="w-full">
//   <thead>
//     <tr className="text-left">
//       <th>Status</th>
//       <th>Title</th>
//       <th>Solution</th>
//       <th>Acceptance</th>
//       <th>Difficulty</th>
//       <th>Frequency</th>
//     </tr>
//   </thead>
//   <tbody>
//     {problems.map((problem, index) => (
//       <tr
//         key={index}
//         className="h-12 border-t border-gray-600 text-center"
//       >
//         <td>
//           <i className={`fas fa-${problem.status}`}></i>
//         </td>
//         <td className="text-left">{problem.title}</td>
//         <td>
//           <i className={`fas fa-${problem.solution}`}></i>
//         </td>
//         <td>{problem.acceptance}</td>
//         <td className="text-green-500">{problem.difficulty}</td>
//         <td>
//           <i className={`fas fa-${problem.frequency}`}></i>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
// </div>
