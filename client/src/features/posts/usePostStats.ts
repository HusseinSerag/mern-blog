import { useQuery } from "@tanstack/react-query";
import { getPostStats } from "./api";

export default function useGetPostStats(userID: string) {
  const { data: postStats, isLoading: isGettingPostStats } = useQuery({
    queryKey: ["post-stats"],
    queryFn: () => getPostStats(userID),
  });

  return {
    postStats,
    isGettingPostStats,
  };
}
