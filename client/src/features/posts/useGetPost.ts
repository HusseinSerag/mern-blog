import { useParams } from "react-router-dom";
import useUser from "../auth/useUser";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api";

export function useGetPost() {
  const { user } = useUser();
  const { postID } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", user?._id, postID],
    queryFn: () => getPost(postID, user!._id),
  });

  return {
    post,
    isLoading,
  };
}
