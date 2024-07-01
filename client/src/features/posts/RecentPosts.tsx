import Loader from "../../components/Loader";
import PostCard from "./PostCard";
import { useRecentPosts } from "./useRecentPosts";

interface RecentPostProps {
  limit?: number;
}
export default function RecentPosts({ limit }: RecentPostProps) {
  const { isLoading, recentPosts } = useRecentPosts(limit);

  return (
    <div className="mx-auto mb-5 flex w-full flex-col items-center justify-center">
      <h1 className="mb-5 text-center text-xl">Recent Articles</h1>

      {isLoading ? (
        <Loader width="30" height="30" />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-5">
          {recentPosts?.posts.map((post) => <PostCard post={post} />)}
        </div>
      )}
    </div>
  );
}
