import { ErrorSchema } from "../../types/ErrorApiSchema";
import * as z from "zod";
import { postSchema } from "../../types/Post";
const url = import.meta.env.VITE_BACKEND_URL as string;

export async function createPost({ formData }: { formData: FormData }) {
  try {
    const response = await fetch(`${url}api/posts`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw new Error(error.message);
    }

    console.log(responseBody);
    const body = z
      .object({
        post: postSchema,
      })
      .parse(responseBody);

    const post = body.post;
    return post.slug;
  } catch (e) {
    throw e;
  }
}

export async function getUserPosts({
  id,
  searchParams,
  pageParam,
}: {
  id: string;
  searchParams: string;
  pageParam: number;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${id}/posts?page=${pageParam}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      },
    );
    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }

    const { count, posts, totalCount } = z
      .object({
        posts: postSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      posts,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getRecentPosts(limit: number = 3) {
  try {
    const response = await fetch(`${url}api/posts?limit=${limit}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }

    const { count, posts, totalCount } = z
      .object({
        posts: postSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      posts,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteUserPost({
  id,
  postID,
}: {
  id: string;
  postID: string;
}) {
  const response = await fetch(`${url}api/users/${id}/posts/${postID}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });

  const responseBody = await response.json();
  if (!response.ok) {
    const error = ErrorSchema.parse(responseBody);
    throw error;
  }
}

export async function getPost(postID: string | undefined, userID: string) {
  if (!postID) return;
  try {
    const response = await fetch(`${url}api/users/${userID}/posts/${postID}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }
    const body = z
      .object({
        posts: postSchema.array(),
      })
      .parse(responseBody);

    return body.posts[0];
  } catch (e) {
    throw e;
  }
}

export async function getPostBySlug(slug: string | undefined) {
  try {
    const response = await fetch(`${url}api/posts?slug=${slug}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }

    const body = z
      .object({
        posts: postSchema.array(),
      })
      .parse(responseBody);

    return body.posts[0];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updatePost({
  postID,
  formData,
}: {
  postID: string;
  formData: FormData;
}) {
  try {
    const response = await fetch(`${url}api/posts/${postID}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw new Error(error.message);
    }

    console.log(responseBody);
    const body = z
      .object({
        post: postSchema,
      })
      .parse(responseBody);

    const post = body.post;
    return post.slug;
  } catch (e) {
    throw e;
  }
}

export async function getPostStats(userID: string) {
  try {
    const response = await fetch(`${url}api/users/${userID}/posts/get-stats`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }

    const { totalPosts, totalPostsLastMonth } = z
      .object({
        totalPosts: z.number(),
        totalPostsLastMonth: z.number(),
      })
      .parse(responseBody);

    return {
      totalPosts,
      totalPostsLastMonth,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getPosts({
  pageParam,
  searchParams,
}: {
  searchParams: string;
  pageParam: number;
}) {
  try {
    const response = await fetch(
      `${url}api/posts?${searchParams}&page=${pageParam}&limit=8`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    const responseBody = await response.json();

    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw error;
    }

    const { count, posts, totalCount } = z
      .object({
        posts: postSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      posts,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
