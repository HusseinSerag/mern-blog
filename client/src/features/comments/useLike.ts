import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeComment } from "./api";
import { toast } from "react-toastify";

export default function useLike() {
  const queryClient = useQueryClient();
  const { mutate: like, isPending: isLiking } = useMutation({
    mutationFn: LikeComment,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries();
      toast.success("Post liked");
    },
  });
  return {
    like,
    isLiking,
  };
}
