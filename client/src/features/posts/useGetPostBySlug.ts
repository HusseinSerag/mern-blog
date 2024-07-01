import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "./api";
import { useParams } from "react-router-dom";

export function useGetPostBySlug() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
  });

  return {
    post,
    isLoading,
  };
}
