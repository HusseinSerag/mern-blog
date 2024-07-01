import { Navigate, useSearchParams } from "react-router-dom";

import DashboardProfile from "../features/profile/DashboardProfile";
import { DashboardSidebar } from "../features/profile/DashboardSidebar";
import DashboardPost from "../features/profile/DashboardPost";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DashboardUsers from "../features/profile/DashboardUser";
import DashboardComments from "../features/profile/DashboardComments";
import DashboardSummary from "../features/profile/DashboardSummary";

const tabs = ["profile", "posts", "users", "comments", "dash"];

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const queryClient = useQueryClient();

  useEffect(
    function () {
      queryClient.resetQueries({
        queryKey: ["posts"],
      });
    },
    [tab, queryClient],
  );
  if (!tab || !tabs.includes(tab)) {
    return <Navigate to={"/dashboard?tab=profile"} replace />;
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <DashboardSidebar />
      {tab === "profile" && <DashboardProfile />}
      {tab === "posts" && <DashboardPost />}
      {tab === "users" && <DashboardUsers />}
      {tab === "comments" && <DashboardComments />}
      {tab === "dash" && <DashboardSummary />}
    </div>
  );
}
