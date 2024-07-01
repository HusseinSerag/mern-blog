import { Button, Textarea } from "flowbite-react";
import useUser from "../auth/useUser";
import { useForm } from "react-hook-form";
import { useCreateComment } from "./useCreateComment";

interface AddCommentProps {
  postID: string;
}
interface FormItems {
  content: string;
}
export default function AddComment({ postID }: AddCommentProps) {
  const { user } = useUser();
  const { isPending, mutate: createComment } = useCreateComment();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<FormItems>();

  const commentContent = watch().content;

  function onSubmit(values: FormItems) {
    createComment(
      {
        content: values.content,
        userID: user!._id,
        postID,
      },
      {
        onSuccess() {
          reset();
        },
      },
    );
  }
  return (
    <div className="rounded-md border border-gray-400 p-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Textarea
          rows={3}
          {...register("content", {
            maxLength: {
              value: 200,
              message: "A maximum of 200 characters is allowed!",
            },
            required: "This field is required",
          })}
          maxLength={200}
          placeholder="Add a comment..."
        />
        {errors.content && (
          <p className="text-sm text-red-600">{errors.content.message}</p>
        )}
        <div className="flex items-center justify-between py-4">
          <span className="text-sm text-gray-400">
            {200 - (commentContent?.length || 0)} characters remaining
          </span>

          <Button
            type="submit"
            disabled={isPending}
            size={"sm"}
            gradientDuoTone={"greenToBlue"}
            outline
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
