import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SheetSkeleton() {
  return (
    <Skeleton
      count={3}
      height={40}
      baseColor="#212121"
      highlightColor="#313131"
    />
  );
}
export function ProblemSkeleton() {
  return (
    <tr className="">
      <td className="px-1">
        <SheetSkeleton />
      </td>
      <td className="pr-1">
        <SheetSkeleton />
      </td>
      <td className="pr-1">
        <SheetSkeleton />
      </td>
      <td className="pr-1">
        <SheetSkeleton />
      </td>
      <td className="pr-1">
        <SheetSkeleton />
      </td>
    </tr>
  );
}

{
  /* <Skeleton count={5} />; */
}
