import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost } from "./api";
import { toast } from "react-toastify";
import useGo from "../../hooks/useGo";
import { useParams } from "react-router-dom";

export function useMutatePost() {
  const queryClient = useQueryClient();
  const { postID } = useParams();
  const editMode = postID;
  const go = useGo();
  const { mutate, isPending } = useMutation({
    mutationFn: editMode ? updatePost : createPost,
    onError: (e) => toast.error(e.message),
    async onSuccess(slug) {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      toast.success(`Post ${editMode ? "edited" : "created"} successfully!`);
      go(`/post/${slug}`);
    },
  });
  return {
    mutate,
    isPending,
  };
}
