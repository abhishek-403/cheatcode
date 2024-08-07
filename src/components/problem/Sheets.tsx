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
      <header className="font-rubik font-bold flex items-center justify-center py-3 text-2xl border-y-2 border-neutral-90 rounded  text-quaternery">
        Popular Sheets
      </header>
      <main className=" flex flex-col gap-1 py-1">
        {isLoading ? (
          <SheetSkeleton />
        ) : (
          data?.result.map((item: any, i: number) => (
            <div key={i} onClick={() => setActiveSheet(item._id)} className="">
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
        "flex items-center justify-between cursor-pointer mx-1 p-4 bg-black hover:bg-neutral-95 rounded-lg transition-all duration-75 ease-in-out font-bold border-b  border-neutral-90 ",
        isActive && "text-primary-70 bg-neutral-95"
      )}
    >
      <span className="font-poppins">{name}</span>
      <span className="text-neutral-60 text-sm">
        {solvedByUser}/{totalProblems}
      </span>
    </div>
  );
}
export default Sheets;
