import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserPost } from "./api";
import { toast } from "react-toastify";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUserPost,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    deletePost: mutate,
    isDeleting: isPending,
  };
}
