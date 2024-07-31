import { cn } from "@nextui-org/react";
import React from "react";
import { SheetsFormat } from "../../store/services/problem";
import { SheetSkeleton } from "../../utils/skeletons";

type SheetsProps = {
  data: any;
  isLoading: boolean;
  setActiveSheet: (_id: string) => void;
  activeSheet: string | null;
};
const Sheets: React.FC<SheetsProps> = ({
  data,
  isLoading,
  setActiveSheet,
  activeSheet,
}) => {
  return (
    <div className="">
      <header className="font-rubik font-bold flex items-center justify-center py-3 text-2xl border-y-2 border-[#2a2a2a] rounded  bg-gradient-to-r from-[#8438ff] via-[#ff45ff] to-[#ffec3e] bg-clip-text text-transparent  ">
        Popular Sheets
      </header>
      <main className=" flex flex-col ">
        {isLoading ? (
          <SheetSkeleton />
        ) : (
          data?.result.map((item: any, i: number) => (
            <div key={i} onClick={() => setActiveSheet(item._id)}>
              <Card {...item} isActive={item._id === activeSheet} />
            </div>
          ))
        )}
      </main>
    </div>
  );
};

function Card({
  name,
  totalProblems,
  solvedByUser,
  isActive,
}: SheetsFormat & { isActive: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between cursor-pointer py-3 px-3  bg-black hover:bg-neutral-90 border-b border-[#1a1a1a]",
        isActive && "bg-neutral-90"
      )}
    >
      <span className="font-rubik">{name}</span>
      <span className="text-[#707070] text-sm">
        {solvedByUser}/{totalProblems}
      </span>
    </div>
  );
}
export default Sheets;
