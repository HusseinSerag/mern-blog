import PostForm from "./PostForm";
import { useMutatePost } from "./useMutatePost";

export interface FormInputs {
  title: string;
  category:
    | "javascript"
    | "typescript"
    | "react.js"
    | "next.js"
    | "uncategorized";
}
export default function CreatePostForm() {
  const { isPending: isCreating, mutate: createPost } = useMutatePost();

  return <PostForm isLoading={isCreating} mutate={createPost} />;
}
