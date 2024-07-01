import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "./api";
import { toast } from "react-toastify";

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createComment,
    onError: (e) => toast.error(e.message),
    async onSuccess(comment) {
      await queryClient.invalidateQueries();
      toast.success("Comment added successfully!");
    },
  });
  return { mutate, isPending };
}
