import { TableCell, TableRow } from "flowbite-react";
import FullPageLoader from "../../components/FullPageLoader";
import useUser from "../auth/useUser";
import useGetUserPosts from "../posts/useGetUserPosts";
import { useGetAllUsers } from "../users/useGetAllUsers";
import DashboardItem from "./DashboardItem";
import { useAdminDashboardComments } from "../comments/useAdminDashboardComments";
import useGetUserStats from "../users/useGetUserStats";
import useGetPostStats from "../posts/usePostStats";
import useGetCommentStats from "../comments/useCommentsStats";
import DashboardStatsItem from "./DashboardStatsItem";
import {
  HiAnnotation,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function DashboardSummary() {
  const { user } = useUser();
  const { isLoading, postData } = useGetUserPosts();
  const { isLoading: isLoadingUsers, userData } = useGetAllUsers();
  const { isGettingUserStats, userStats } = useGetUserStats();
  const { comments, isLoading: isLoadingComments } =
    useAdminDashboardComments();
  const { isGettingPostStats, postStats } = useGetPostStats(user!._id);
  const { commentStats, isGettingCommentStats } = useGetCommentStats();
  const isFetching =
    isLoading ||
    isLoadingUsers ||
    isLoadingComments ||
    isGettingUserStats ||
    isGettingPostStats ||
    isGettingCommentStats;
  console.log(commentStats);
  if (isFetching) {
    return (
      <div className="flex w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  } else {
    const users = userData.users?.slice(0, 6);
    const allComments = comments.comments?.slice(0, 6);
    const posts = postData.posts?.slice(0, 6);
    return (
      <div className="max-w-4xl p-4 sm:mx-auto">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <DashboardStatsItem
            icon={
              <HiOutlineUserGroup className="rounded-full bg-teal-600 p-3 text-5xl text-white shadow-lg" />
            }
            totalAmountPerMonth={userStats!.totalUserLastMonth}
            totalAmount={userStats!.totalUser}
            title={"users"}
          />
          <DashboardStatsItem
            totalAmountPerMonth={commentStats!.totalCommentsLastMonth}
            totalAmount={commentStats!.totalComments}
            title="comments"
            icon={
              <HiAnnotation className="rounded-full bg-purple-700 p-3 text-5xl text-white shadow-lg" />
            }
          />
          <DashboardStatsItem
            icon={
              <HiDocumentText className="rounded-full bg-lime-600 p-3 text-5xl text-white shadow-lg" />
            }
            totalAmount={postStats!.totalPosts}
            totalAmountPerMonth={postStats!.totalPostsLastMonth}
            title="posts"
          />
        </div>
        <div className="mx-auto flex flex-wrap justify-center gap-4 py-3">
          <>
            <DashboardItem
              title="users"
              link="/dashboard?tab=users"
              headItems={["User Image", "Username"]}
            >
              {users ? (
                users.map((user) => (
                  <TableRow
                    className="dark:border-gray-700 dark:bg-gray-800"
                    key={user._id}
                  >
                    <TableCell>
                      <img
                        src={
                          user.photoURL ||
                          "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
                        }
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                ))
              ) : (
                <div>No users yet!</div>
              )}
            </DashboardItem>
          </>
          <>
            <DashboardItem
              link="/dashboard?tab=comments"
              title="comments"
              headItems={["Comment Content", "Likes"]}
            >
              {allComments ? (
                allComments.map((comment) => (
                  <TableRow
                    className="dark:border-gray-700 dark:bg-gray-800"
                    key={comment._id}
                  >
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <div> no comments yet!</div>
              )}
            </DashboardItem>
          </>
          <>
            <DashboardItem
              link="/dashboard?tab=posts"
              title="posts"
              headItems={["Post image", "post title", "category"]}
            >
              {posts ? (
                posts.map((post) => (
                  <TableRow
                    className="dark:border-gray-700 dark:bg-gray-800"
                    key={post._id}
                  >
                    <TableCell>
                      <img
                        src={post.photoURL}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="line-clamp-2">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                  </TableRow>
                ))
              ) : (
                <div> no posts yet!</div>
              )}
            </DashboardItem>
          </>
        </div>
      </div>
    );
  }
}
