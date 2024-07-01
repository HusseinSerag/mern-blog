import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { deleteComment } from "./api";

export default function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate: deleteUserComment, isPending: isDeleting } = useMutation({
    mutationFn: deleteComment,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries();
    },
  });
  return {
    deleteUserComment,
    isDeleting,
  };
}
