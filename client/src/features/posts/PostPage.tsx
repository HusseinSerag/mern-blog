import { Link } from "react-router-dom";
import FullPageLoader from "../../components/FullPageLoader";
import { useGetPostBySlug } from "./useGetPostBySlug";
import { Button } from "flowbite-react";
import CallToAction from "../../components/CallToAction";
import useUser from "../auth/useUser";
import AddComment from "../comments/AddComment";

import CommentSection from "../comments/CommentSection";
import RecentPosts from "./RecentPosts";

export default function PostPage() {
  const { isLoading, post } = useGetPostBySlug();
  const { user } = useUser();
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <FullPageLoader />
      </div>
    );
  if (!post)
    return (
      <div className="flex w-full items-center justify-center">
        This post doesn't exist
      </div>
    );
  else
    return (
      <main className="mx-auto flex max-w-6xl flex-col p-3">
        <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
          {post.title}
        </h1>

        <div className="mx-auto mt-5 w-full text-center">
          <Link
            className="flex items-center justify-center"
            to={`/search?=category=${post.category}`}
          >
            <Button className="" color="gray" pill size={"xs"}>
              {post.category}
            </Button>
          </Link>
        </div>

        <img
          src={post.photoURL}
          alt={`post image ${post.title}`}
          className="mx-auto mt-10 max-h-[600px] w-full max-w-[800px] object-cover p-3"
        />

        <div className="mx-auto flex w-full max-w-2xl items-center justify-between border-b border-slate-500 p-3 text-xs">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {(post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="post-content mx-auto w-full max-w-2xl p-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className="mx-auto my-4 w-full max-w-4xl">
          <CallToAction />
        </div>
        <div className="mx-auto flex w-full max-w-2xl gap-2 p-3">
          {user ? (
            <>
              <div>Signed in as:</div>
              <div className="flex items-center gap-2">
                <span>
                  <img
                    className="h-6 w-6 rounded-full object-cover"
                    src={
                      user.photoURL ||
                      "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
                    }
                  />
                </span>
                <span className="text-sm">{user?.username}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              You must be signed in to comment.
              <Link className="text-sm text-teal-500" to={"/signin"}>
                sign in
              </Link>
            </div>
          )}
        </div>
        {user && (
          <div className="mx-auto w-full max-w-2xl p-3">
            <AddComment postID={post._id} />
          </div>
        )}

        <CommentSection postID={post._id} />

        <RecentPosts />
      </main>
    );
}
