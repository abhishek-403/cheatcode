import ProblemCard from "../components/problem/ProblemCard";
import Sheets from "../components/problem/Sheets";

export default function ProblemSet() {
  return (
    <div className="text-white px-[100px] mt-8">
      <div className="flex gap-5 justify-between">
        <div className="w-[25%] h-fit  bg-black border-x border-[#2a2a2a] rounded">
          <Sheets />
        </div>
        <main className="w-[75%] overflow-auto ">
          <div className="flex items-center justify-center font-salsa text-3xl py-3 rounded border border-[#2a2a2a] bg-gradient-to-r from-[#88ff4c] via-[#61edff] to-[#966fe5] bg-clip-text text-transparent font-bold ">
            CheatCode Special
          </div>
          <div className="relative h-[75vh] overflow-x-auto mx-auto  ">
            <table className="text-sm text-left text-gray-400  w-full max-w-[1500px] mx-auto gap-[2px]  ">
              {
                <thead className="text-md font-bold font-rubik text-gray-300  uppercase  border-b border-[#2a2a2a] ">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Difficulty
                    </th>

                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 w-0 font-medium">
                      Solution
                    </th>
                    <th scope="col" className="px-1 py-3 w-0 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
              }
              <ProblemCard />
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
