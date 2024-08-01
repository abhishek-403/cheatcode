import { useEffect, useState } from "react";
import ProblemCard from "../components/problem/ProblemCard";
import Sheets from "../components/problem/Sheets";
import {
  useGetAllSheetsQuery,
  useGetProblemsBySheetIdQuery,
} from "../store/services/problem";

export default function ProblemSet() {
  const { data: sheetsData, isLoading: sheetsLoading } = useGetAllSheetsQuery();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const { data: problemsArray, isLoading: problemsLoading } =
    useGetProblemsBySheetIdQuery(
      { sheetId: activeSheet ?? "" },
      { skip: !activeSheet }
    );

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
            {sheetsData?.result?.find((sheet: any) => sheet._id === activeSheet)
              ?.name ?? "CheatCode Special"}
          </div>
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

              <ProblemCard data={problemsArray} isLoading={problemsLoading} />
            </table>
          </div>
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
