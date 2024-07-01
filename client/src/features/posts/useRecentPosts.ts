import { useQuery } from "@tanstack/react-query";
import { getRecentPosts } from "./api";

export function useRecentPosts(limit?: number) {
  const { data: recentPosts, isLoading } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: () => getRecentPosts(limit),
  });
  return {
    recentPosts,
    isLoading,
  };
}
