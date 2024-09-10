import { cn, Tooltip } from "@nextui-org/react";
import { format } from "date-fns";
import { useState } from "react";
export const HeatmapCalendar = ({
  submissionsMap,
}: {
  submissionsMap: any;
}) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const generateHeatmapForMonth = (month: any) => {
    const startDate = new Date(currentYear, month, 1);
    const endDate = new Date(currentYear, month + 1, 0);

    const days = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      days.push(new Date(d));
    }

    return (
      days.map((day) => {
          const dateString = format(day, "yyyy-MM-dd");
          const count = submissionsMap[dateString] || 0;
          const intensity = Math.min(count * 25, 100);

          return (
            <Tooltip
              key={dateString}
              className="text-xs "
              content={`${count} submissions on ${format(day, "MMM dd, yyyy")}`}
            >
              <div
                className={cn(
                  "w-3 h-3 m-[2px]  rounded-sm cursor-pointer",
                  "bg-neutral-80"
                )}
                style={{
                  backgroundColor:
                    intensity > 0
                      ? `rgba(13, 255, 49, ${intensity / 100})`
                      : "",
                }}
              />
            </Tooltip>
          );
        })
     
    );
  };

  const generateYearHeatmap = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return months.map((month) => (
      <div key={month} className="mb-4 flex flex-col justify-between">
        <div className="grid grid-cols-5">{generateHeatmapForMonth(month)}</div>
        <div className="text-center mt-2 text-neutral-40 font-inter">
          {format(new Date(currentYear, month, 1), "MMMM").slice(0, 3)}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex gap-6 flex-shrink-0 ">{generateYearHeatmap()}</div>
  );
};
