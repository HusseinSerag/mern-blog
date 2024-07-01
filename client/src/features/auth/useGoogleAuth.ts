import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleAuth } from "./api";
import { toast } from "react-toastify";

export function useGoogleAuth() {
  const queryClient = useQueryClient();
  const { mutate: signInWithGoogle, isPending } = useMutation({
    mutationFn: googleAuth,
    async onSuccess() {
      await queryClient.invalidateQueries();
    },
    onError(e) {
      toast.error(e.message);
    },
  });

  return {
    signInWithGoogle,
    isPending,
  };
}
