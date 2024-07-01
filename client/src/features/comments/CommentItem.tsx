import { Comment } from "../../types/Comment";
import useUser from "../auth/useUser";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useLike from "./useLike";
import useUnLike from "./useUnlike";
import Modal from "../../components/Modal";
import { Button, Textarea } from "flowbite-react";
import { Link } from "react-router-dom";
import useDeleteComment from "./useDeleteComment";
import { useEditComment } from "./useEditComment";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment: Comment;
}
interface FormProps {
  content: string;
}
export default function CommentItem({ comment }: CommentItemProps) {
  const { user } = useUser();
  const isUser = user?._id === comment.user._id;
  const isAdmin = user?.role === "admin";
  const hasEditDeleteAccess = isUser || isAdmin;
  const { isLiking, like } = useLike();
  const { isUnLiking, unlike } = useUnLike();
  const { deleteUserComment, isDeleting } = useDeleteComment();
  const { editPostComment, isEditing } = useEditComment();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    defaultValues: comment,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(
    function () {
      if (!user) {
        setEditMode(false);
      }
    },
    [user?._id],
  );
  function likeComment() {
    if (!isLiking && user)
      like({
        postID: comment.postID,
        commentID: comment._id,
        userID: user!._id,
      });
  }
  function unLikeComment() {
    if (!isUnLiking && user)
      unlike({
        postID: comment.postID,
        commentID: comment._id,
        userID: user!._id,
      });
  }
  function deleteComment() {
    if (!isDeleting && user) {
      deleteUserComment({
        postID: comment.postID,
        commentID: comment._id,
        userID: user!._id,
      });
    }
  }

  function onSubmit(values: FormProps) {
    if (!isEditing)
      editPostComment(
        {
          postID: comment.postID,
          commentID: comment._id,
          userID: user!._id,
          content: values.content,
        },
        {
          onSuccess() {
            toast.success("Comment edited!");
            setEditMode(false);
          },
        },
      );
  }
  const userLikedPost = comment.likedUsers.includes(user?._id || "");

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 flex gap-4">
          <div>
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={
                comment.user.photoURL ||
                "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
              }
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold">
                {comment.user.username} {isUser && "(You)"}
              </h1>

              <div className="text-sm text-gray-400">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </div>
            </div>
            {!editMode ? (
              <div className="py-6 text-gray-400">{comment.content}</div>
            ) : (
              <>
                <Textarea
                  {...register("content", {
                    maxLength: {
                      message: "Maximum characters are 200",
                      value: 200,
                    },
                    required: "This field is required",
                  })}
                  defaultValue={comment.content}
                  rows={3}
                ></Textarea>
              </>
            )}
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                {!userLikedPost ? (
                  user ? (
                    <button
                      type="button"
                      onClick={likeComment}
                      disabled={isLiking || isUnLiking}
                    >
                      <AiOutlineLike />
                    </button>
                  ) : (
                    <Modal.ModalTrigger
                      name={`like_${comment._id}`}
                      render={(onClick) => (
                        <button type="button" onClick={onClick}>
                          <AiOutlineLike />
                        </button>
                      )}
                    />
                  )
                ) : (
                  <button
                    type="button"
                    onClick={unLikeComment}
                    disabled={isLiking || isUnLiking}
                  >
                    <AiOutlineDislike />
                  </button>
                )}{" "}
                <span className="text-sm text-gray-500">
                  {comment.numberOfLikes} likes
                </span>
              </div>
              {hasEditDeleteAccess &&
                (!editMode ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (hasEditDeleteAccess) setEditMode(true);
                    }}
                    className="text-sm text-gray-400"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (hasEditDeleteAccess) setEditMode(false);
                    }}
                    className="text-sm text-gray-400"
                  >
                    close
                  </button>
                ))}
              {hasEditDeleteAccess && editMode && (
                <button
                  disabled={isEditing}
                  type="submit"
                  className="text-sm text-gray-400"
                >
                  Save comment
                </button>
              )}
              {hasEditDeleteAccess && (
                <button
                  onClick={deleteComment}
                  className="text-sm text-gray-400"
                  type="button"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <Modal.ModalContent
        open={`like_${comment._id}`}
        render={() => (
          <div>
            <h1 className="text-center font-semibold">
              You need to login in to do this action!
            </h1>
            <div className="my-4 flex items-center justify-between">
              <Button>
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      />
    </Modal>
  );
}
