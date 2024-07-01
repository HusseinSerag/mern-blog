import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "./api";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    login,
    isLoggingIn,
  };
}
