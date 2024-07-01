import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "./api";
import { toast } from "react-toastify";

export function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: registerUser, isPending: isSigningUp } = useMutation({
    mutationFn: signup,
    onError: (e) => toast.error(e.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return {
    registerUser,
    isSigningUp,
  };
}
