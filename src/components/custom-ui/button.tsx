export const PrimaryButton = ({ title, icon }: any) => {
  return (
    <div className="flex gap-3 bg-[#6044eb] px-[15px] py-[8px] items-center rounded-md justify-center cursor-pointer hover:bg-[#6e57e0] ">
      <span className="text-white font-salsa text-xl ">{title}</span>
      <span className="text-xl">{icon}</span>
    </div>
  );
};
