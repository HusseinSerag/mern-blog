import { useQuery } from "@tanstack/react-query";
import { getCommentsStats } from "./api";

export default function useGetCommentStats() {
  const { data: commentStats, isLoading: isGettingCommentStats } = useQuery({
    queryKey: ["comment-stats"],
    queryFn: getCommentsStats,
  });

  return {
    commentStats,
    isGettingCommentStats,
  };
}
