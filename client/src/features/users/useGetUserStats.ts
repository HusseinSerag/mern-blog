import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "./api";

export default function useGetUserStats() {
  const { data: userStats, isLoading: isGettingUserStats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  return {
    userStats,
    isGettingUserStats,
  };
}
