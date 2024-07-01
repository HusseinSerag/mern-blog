import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";
import RecentPosts from "../features/posts/RecentPosts";

export default function HomePage() {
  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-28 px-3">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs font-bold text-teal-500 hover:underline sm:text-sm"
        >
          View all posts
        </Link>
      </div>
      <div className="bg-amber-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="mx-auto my-4 max-w-7xl px-4">
        <RecentPosts limit={6} />
      </div>
      <div className="my-4 flex items-center justify-center">
        <Link
          to={"/search"}
          className="text-center text-lg text-teal-500 hover:underline"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}
