import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "./api";
import { toast } from "react-toastify";

export function useDeleteAUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries();
    },
  });

  return {
    deleteUser: mutate,
    isDeleting: isPending,
  };
}
