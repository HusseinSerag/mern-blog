import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment } from "./api";
import { toast } from "react-toastify";

export function useEditComment() {
  const queryClient = useQueryClient();
  const { mutate: editPostComment, isPending: isEditing } = useMutation({
    mutationFn: editComment,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries();
    },
  });
  return {
    editPostComment,
    isEditing,
  };
}
