import { Link } from "react-router-dom";
import { Post } from "../../types/Post";

interface PostCardProps {
  post: Post;
}
export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-lg border border-teal-500 transition-all hover:border-2 sm:w-[350px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.photoURL}
          alt="post cover"
          className="z-20 h-[260px] w-full object-cover transition-transform duration-300 group-hover:h-[200px]"
        />
        <div className="flex flex-col gap-2 p-3">
          <p className="text-lg font-semibold group-hover:line-clamp-2">
            {post.title}
          </p>
          <span className="text-sm italic">{post.category}</span>

          <Link
            to={`/post/${post.slug}`}
            className="absolute bottom-[-200px] left-0 right-0 z-10 m-2 rounded-md rounded-tl-none border border-teal-500 py-2 text-center text-teal-500 transition-all duration-300 group-hover:bottom-0 hover:bg-teal-500 hover:text-white"
          >
            Read Article
          </Link>
        </div>
      </Link>
    </div>
  );
}
