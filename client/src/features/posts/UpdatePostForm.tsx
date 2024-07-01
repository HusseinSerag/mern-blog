import FullPageLoader from "../../components/FullPageLoader";

import { useGetPost } from "./useGetPost";

import PostForm from "./PostForm";
import { useMutatePost } from "./useMutatePost";

export default function UpdatePostForm() {
  const { isLoading, post } = useGetPost();
  const { mutate: updatePost, isPending: isUpdating } = useMutatePost();
  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  }

  if (!post)
    return (
      <div className="w-full py-9 text-center text-3xl">
        This post doesn't exist!
      </div>
    );
  return <PostForm post={post} mutate={updatePost} isLoading={isUpdating} />;
}
