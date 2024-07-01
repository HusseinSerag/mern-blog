import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LikeComment, unlikeComment } from "./api";
import { toast } from "react-toastify";

export default function useUnLike() {
  const queryClient = useQueryClient();
  const { mutate: unlike, isPending: isUnLiking } = useMutation({
    mutationFn: unlikeComment,
    onError: (e) => toast.error(e.message),
    async onSuccess() {
      await queryClient.invalidateQueries();
      toast.success("Post unliked");
    },
  });
  return {
    unlike,
    isUnLiking,
  };
}
