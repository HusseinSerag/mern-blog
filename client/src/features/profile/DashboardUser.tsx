import { Button, Table } from "flowbite-react";
import Loader from "../../components/Loader";
import useUser from "../auth/useUser";
import { useGetAllUsers } from "../users/useGetAllUsers";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { useDeleteAUser } from "../users/useDeleteAUser";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashboardUsers() {
  const { fetchNextPage, isFetchingNextPage, isLoading, userData } =
    useGetAllUsers();
  const { deleteUser, isDeleting } = useDeleteAUser();
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
        userData?.totalCount &&
        userData.totalCount > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>

                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {userData.users?.map((user) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={user._id}
                  >
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={
                          user.photoURL ||
                          "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
                        }
                        alt={user.username}
                        className="h-10 w-10 rounded-full bg-gray-500 object-cover"
                        loading="lazy"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.username}{" "}
                        {user._id === currentUser?._id && "(you)"}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>

                    <Table.Cell>
                      {user.role === "admin" ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {user._id === currentUser._id ? (
                        <Link
                          className="cursor-pointer font-medium text-red-500 hover:underline"
                          to={"/dashboard?tab=profile#delete"}
                        >
                          Delete yourself
                        </Link>
                      ) : (
                        <Modal.ModalTrigger
                          name={`delete_${user._id}`}
                          render={(onClick) => (
                            <span
                              onClick={onClick}
                              className="cursor-pointer font-medium text-red-500 hover:underline"
                            >
                              Delete
                            </span>
                          )}
                        />
                      )}
                    </Table.Cell>

                    <Modal.ModalContent
                      render={(onClick) => (
                        <div className="space-y-5">
                          <h1>Are you sure you want to delete this user?</h1>

                          <div className="flex justify-between">
                            <Button
                              disabled={isDeleting}
                              color="failure"
                              onClick={() =>
                                deleteUser(user._id, {
                                  onSuccess: () => {
                                    toast.success("User deleted successfully!");
                                  },
                                })
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
                      open={`delete_${user._id}`}
                    />
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {userData.count === 10 && !isFetchingNextPage && (
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
          <p>No users exists!</p>
        )}
      </div>
    </Modal>
  );
}
