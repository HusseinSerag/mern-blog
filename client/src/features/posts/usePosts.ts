import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "./api";
import { useSearchParams } from "react-router-dom";

export default function usePosts() {
  const [searchParams] = useSearchParams();

  const params = searchParams.toString();

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts-search", params],
      initialPageParam: 0,
      queryFn: (pageParam) =>
        getPosts({
          searchParams: params,
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
    posts: data?.pages.map((page) => page.posts).flat(),
  };
  return {
    postData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  };
}
