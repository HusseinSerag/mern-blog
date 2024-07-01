import { useInfiniteQuery } from "@tanstack/react-query";

import { getAdminComments } from "./api";

export function useAdminDashboardComments() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["comments-admin"],
      initialPageParam: 0,
      queryFn: (pageParam) =>
        getAdminComments({
          pageParam: pageParam.pageParam,
        }),
      getNextPageParam: (lastPage, page, lastPageParam) => {
        if (lastPage.count === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  const postData = {
    count: data?.pages[data.pages.length - 1].count,
    totalCount: data?.pages[data.pages.length - 1].totalCount,
    comments: data?.pages.map((page) => page.comments).flat(),
  };
  return {
    comments: postData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  };
}
