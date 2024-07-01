import { useInfiniteQuery } from "@tanstack/react-query";

import { getAllUsers } from "./api";

export function useGetAllUsers() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      initialPageParam: 0,
      queryFn: (pageParam) =>
        getAllUsers({
          pageParam: pageParam.pageParam,
        }),
      getNextPageParam: (lastPage, page, lastPageParam) => {
        if (lastPage.count === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  const userData = {
    count: data?.pages[data.pages.length - 1].count,
    totalCount: data?.pages[data.pages.length - 1].totalCount,
    users: data?.pages.map((page) => page.users).flat(),
  };
  return {
    userData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  };
}
