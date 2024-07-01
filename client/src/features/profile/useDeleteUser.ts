import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "./api";
import { toast } from "react-toastify";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: DeleteUserInformation, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    DeleteUserInformation,
    isDeleting,
  };
}
