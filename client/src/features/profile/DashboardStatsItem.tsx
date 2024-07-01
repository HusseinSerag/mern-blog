import { ReactElement, ReactNode } from "react";
import { HiArrowNarrowUp } from "react-icons/hi";

interface DashboardStatsItem {
  title: string;
  totalAmountPerMonth: number;
  totalAmount: number;
  icon: ReactNode;
}
export default function DashboardStatsItem({
  totalAmountPerMonth,
  totalAmount,
  title,
  icon,
}: DashboardStatsItem) {
  return (
    <div className="w-full min-w-[250px] max-w-[400px] flex-1 rounded-lg p-3 shadow-lg dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div className="font-thin uppercase text-gray-500">Total {title}</div>
        {icon}
      </div>
      <div className="my-2 text-xl font-semibold">{totalAmount}</div>
      <div className="mt-2 flex items-center gap-1 text-sm">
        {totalAmountPerMonth > 0 ? (
          <span className="inline-flex gap-1 text-green-600">
            <HiArrowNarrowUp /> {totalAmountPerMonth}
          </span>
        ) : (
          <span>{totalAmountPerMonth}</span>
        )}{" "}
        Last month
      </div>
    </div>
  );
}
