import { useEffect, useState } from "react";
import ProblemCard from "../components/problemset/ProblemCard";
import Sheets from "../components/problemset/Sheets";
import {
  useGetAllSheetsQuery,
  useGetProblemsBySheetIdQuery,
} from "../store/services/problem";
import { CustomSkeleton } from "../utils/skeletons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { isUserAuthenticated } from "../hooks/useAuthState";

export default function ProblemSet() {
  const {
    data: sheetsData,
    isLoading: sheetsLoading,
    error: sheetsError,

    refetch: refetchSheets,
  } = useGetAllSheetsQuery();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const {
    data: problemsArray,
    isLoading: problemsLoading,
    error: problemsError,
    refetch: refetchProblems,
  } = useGetProblemsBySheetIdQuery(
    { sheetId: activeSheet ?? "" },
    { skip: !activeSheet }
  );
  const authUser = isUserAuthenticated();

  useEffect(() => {
    if (problemsArray) {
      refetchProblems()
    }
    refetchSheets()
  }, [refetchSheets, refetchProblems, authUser]);
  useEffect(() => {
    if (!sheetsLoading && sheetsData?.result?.length > 0) {
      setActiveSheet(sheetsData.result[0]._id);
    }
  }, [sheetsData, sheetsLoading]);

  return (
    <div className="text-white px-[20px] mt-8 w-full">
      <div className="flex gap-2 justify-between">
        <div className="w-[25%] h-fit  bg-black border-x border-neutral-80 rounded">
          <Sheets
            data={sheetsData}
            isLoading={sheetsLoading}
            activeSheet={activeSheet}
            setActiveSheet={setActiveSheet}
          />
        </div>
        <main className="w-[75%] overflow-auto ">
          <div className="flex items-center justify-center  text-3xl py-3 rounded border-x-2 border-t-2 border-neutral-90 text-primary-70 font-extrabold  bg-neutral-100 font-inter">
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
