import { Button, Table } from "flowbite-react";
import useUser from "../auth/useUser";
import useGetUserPosts from "../posts/useGetUserPosts";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useDeletePost } from "../posts/useDeletePost";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

export default function DashboardPost() {
  const { isLoading, postData, fetchNextPage, isFetchingNextPage } =
    useGetUserPosts();
  const { user } = useUser();
  const { deletePost, isDeleting } = useDeletePost();
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-24">
        <Loader height="60" width="60" />
      </div>
    );
  return (
    <Modal>
      <div className="table-auto overflow-x-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto">
        {user?.role === "admin" &&
        postData?.totalCount &&
        postData.totalCount > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>post image</Table.HeadCell>
                <Table.HeadCell>post title</Table.HeadCell>
                <Table.HeadCell>category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {postData.posts?.map((post) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={post._id}
                  >
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.photoURL}
                          alt={post.title}
                          className="h-10 w-20 bg-gray-500 object-cover"
                          loading="lazy"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <Modal.ModalTrigger
                        name={`delete_${post._id}`}
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
                    <Table.Cell>
                      <Link to={`/updatePost/${post._id}`}>
                        <span className="text-teal-500 hover:underline">
                          Edit
                        </span>
                      </Link>
                    </Table.Cell>
                    <Modal.ModalContent
                      render={(onClick) => (
                        <div className="space-y-5">
                          <h1>Are you sure you want to delete this post?</h1>

                          <div className="flex justify-between">
                            <Button
                              disabled={isDeleting}
                              color="failure"
                              onClick={() =>
                                deletePost(
                                  { id: user._id, postID: post._id },
                                  {
                                    onSuccess: () => {
                                      toast.success(
                                        "Post deleted successfully!",
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
                      open={`delete_${post._id}`}
                    />
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {postData.count === 10 && !isFetchingNextPage && (
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
          <p>You have no posts yet</p>
        )}
      </div>
    </Modal>
  );
}
