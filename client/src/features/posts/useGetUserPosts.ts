import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserPosts } from "./api";
import useUser from "../auth/useUser";
import { useSearchParams } from "react-router-dom";

export default function useGetUserPosts() {
  const { user } = useUser();
  const [writtenSearchParams] = useSearchParams();
  const searchParams = writtenSearchParams.toString();
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", user?._id, searchParams],
      initialPageParam: 0,
      queryFn: (pageParam) =>
        getUserPosts({
          id: user!._id,
          searchParams,
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
