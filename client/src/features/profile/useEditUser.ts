import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "./api";
import { toast } from "react-toastify";

export function useEditUser() {
  const queryClient = useQueryClient();
  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationFn: editUser,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    edit,
    isEditing,
  };
}
