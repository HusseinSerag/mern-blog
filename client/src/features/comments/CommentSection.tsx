import Loader from "../../components/Loader";
import CommentItem from "./CommentItem";
import { useGetComments } from "./useGetComments";

export interface CommentSectionProps {
  postID: string;
}
export default function CommentSection({ postID }: CommentSectionProps) {
  const { fetchNextPage, isFetchingNextPage, isLoading, comments } =
    useGetComments({ postID });
  if (isLoading) {
    return <Loader height="30" width="30" />;
  } else {
    const totalComments = comments.totalCount;

    return (
      <>
        <div className="flex items-center gap-2">
          <div className="text-gray-700">Comments</div>{" "}
          <div className="rounded-sm border px-2 py-1">
            {(comments.comments && totalComments) || 0}
          </div>
        </div>
        <div className="py-6">
          <div>
            {comments.comments && comments?.comments?.length > 0 ? (
              <div className="flex flex-col">
                {comments.comments?.map((comment) => {
                  return <CommentItem comment={comment} key={comment._id} />;
                })}
                {comments.comments.length < comments?.totalCount! &&
                  !isFetchingNextPage && (
                    <button
                      onClick={() => fetchNextPage()}
                      className="w-full self-center py-7 text-sm text-teal-500"
                    >
                      Show more
                    </button>
                  )}
                {isFetchingNextPage && (
                  <div className="my-7 flex items-center justify-center">
                    <Loader height="30" width="30" />
                  </div>
                )}
              </div>
            ) : (
              <div>This post has zero comments! Add the first comment now!</div>
            )}
          </div>
        </div>
      </>
    );
  }
}
