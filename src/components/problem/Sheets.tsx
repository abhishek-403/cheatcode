import React from "react";

type SheetsProps = {};
const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Sheets: React.FC<SheetsProps> = () => {
  return (
    <div className="">
      <header className="font-rubik font-bold flex items-center justify-center py-3 text-2xl border-y-2 border-[#2a2a2a] rounded  bg-gradient-to-r from-[#8438ff] via-[#ff45ff] to-[#ffec3e] bg-clip-text text-transparent  ">
        Popular Sheets
      </header>
      <main className=" flex flex-col ">
        {new Array(9).fill(null).map((item, i) => (
          <Card key={i} />
        ))}
      </main>
    </div>
  );
};

function Card() {
  return (
    <div className="flex items-center justify-between cursor-pointer py-3 px-3  bg-black hover:bg-[#131313] rounded border-b border-[#1a1a1a]">
      <span className="font-rubik">Love Babar Sheet</span>
      <span className="text-[#707070] text-xs">0/100</span>
    </div>
  );
}
export default Sheets;
