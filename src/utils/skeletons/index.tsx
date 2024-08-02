import { cn } from "@nextui-org/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SubmissionResultSkeleton() {
  return (
    <div className="w-full px-3 flex flex-col gap-1 mb-3">
      <div className="flex w-full flex-col">
        <CustomSkeleton height={50} width={300} />
        <CustomSkeleton height={20} width={200} />
      </div>
      <CustomSkeleton height={220} />
    </div>
  );
}
export function SubmissionListSkeleton() {
  return (
    <div className="w-full px-2 flex flex-col gap-1">
      <CustomSkeleton className="" height={40} />
      <div className="flex flex-col ">
        <CustomSkeleton className="" height={60} />
        <CustomSkeleton className="" height={60} />
        <CustomSkeleton className="" height={60} />
      </div>
    </div>
  );
}
export function ProblemPageSkeleton() {
  return (
    <div className="p-2 flex w-full h-screen gap-3">
      <div className="flex-1 h-full flex flex-col gap-1 ">
        <CustomSkeleton height={50} />
        <div className="pt-2">
          <CustomSkeleton width={250} height={60} />
        </div>
        <div className="pt-2 flex flex-col gap-1">
          <CustomSkeleton height={30} />
          <CustomSkeleton height={30} />
          <CustomSkeleton height={30} className="w-[90%]" />
        </div>
        <div className="pt-8">
          <CustomSkeleton height={30} width={160} />
          <CustomSkeleton height={80} />
        </div>
        <div className="pt-4">
          <CustomSkeleton height={30} width={160} />
          <CustomSkeleton height={80} />
        </div>
        <div className="pt-4">
          <CustomSkeleton height={30} width={160} />
          <CustomSkeleton height={80} />
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full gap-2">
        <div className="h-[42vh]">
          <CustomSkeleton height={50} />
          <CustomSkeleton className="h-full" />
        </div>
        <div className="pt-12">
          <TestCasesSkeleton />
        </div>
      </div>
    </div>
  );
}
export function TestCasesSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3 my-2">
      <div>
        <CustomSkeleton height={50} width={200} />
      </div>
      <div className="flex gap-2">
        <CustomSkeleton count={1} width={80} height={35} />
        <CustomSkeleton count={1} width={80} height={35} />
        <CustomSkeleton count={1} width={80} height={35} />
      </div>
      <div className="flex flex-col gap-2">
        <CustomSkeleton count={1} height={60} />
        <CustomSkeleton count={1} height={60} />
        <CustomSkeleton count={1} height={60} />
      </div>
    </div>
  );
}
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

export function CustomSkeleton({
  count,
  height,
  width,
  className,
}: {
  count?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
}) {
  return (
    <Skeleton
      count={count}
      height={height}
      width={width}
      baseColor="#212121"
      highlightColor="#313131"
      className={cn("rounded-lg", className)}
    />
  );
}
