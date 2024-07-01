import { Button, Table } from "flowbite-react";
import Loader from "../../components/Loader";
import useUser from "../auth/useUser";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import { useAdminDashboardComments } from "../comments/useAdminDashboardComments";
import useDeleteComment from "../comments/useDeleteComment";

export default function DashboardUsers() {
  const { fetchNextPage, isFetchingNextPage, isLoading, comments } =
    useAdminDashboardComments();
  const { deleteUserComment, isDeleting } = useDeleteComment();
  const { user: currentUser } = useUser();
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-24">
        <Loader height="60" width="60" />
      </div>
    );
  return (
    <Modal>
      <div className="table-auto overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto">
        {currentUser?.role === "admin" &&
        comments?.totalCount &&
        comments.totalCount > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Number of likes</Table.HeadCell>
                <Table.HeadCell>Post ID</Table.HeadCell>
                <Table.HeadCell>User ID</Table.HeadCell>

                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {comments.comments?.map((comment) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={comment._id}
                  >
                    <Table.Cell>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <span className="line-clamp-2">{comment.content}</span>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    <Table.Cell>{comment.postID}</Table.Cell>

                    <Table.Cell>{comment.user._id}</Table.Cell>
                    <Table.Cell>
                      <Modal.ModalTrigger
                        name={`delete_${comment._id}`}
                        render={(onClick) => (
                          <span
                            onClick={onClick}
                            className="cursor-pointer font-medium text-red-500 hover:underline"
                          >
                            Delete
                          </span>
                        )}
                      />
                    </Table.Cell>

                    <Modal.ModalContent
                      render={(onClick) => (
                        <div className="space-y-5">
                          <h1>Are you sure you want to delete this comment?</h1>

                          <div className="flex justify-between">
                            <Button
                              disabled={isDeleting}
                              color="failure"
                              onClick={() =>
                                deleteUserComment(
                                  {
                                    commentID: comment._id,
                                    userID: currentUser._id,
                                    postID: comment.postID,
                                  },
                                  {
                                    onSuccess: () => {
                                      toast.success(
                                        "Comment deleted successfully!",
                                      );
                                    },
                                  },
                                )
                              }
                            >
                              Yes
                            </Button>
                            <Button
                              disabled={isDeleting}
                              color="gray"
                              onClick={onClick}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      open={`delete_${comment._id}`}
                    />
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {comments.count === 10 && !isFetchingNextPage && (
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
          </>
        ) : (
          <p>No comments exists!</p>
        )}
      </div>
    </Modal>
  );
}
