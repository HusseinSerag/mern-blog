import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "./api";
import { toast } from "react-toastify";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      await queryClient.resetQueries();
      queryClient.removeQueries();
      toast.success("Logout successful!");
    },
  });

  return {
    logout,
    isLoggingOut,
  };
}
