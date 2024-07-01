import { commentSchema } from "../../types/Comment";
import { ErrorSchema } from "../../types/ErrorApiSchema";
import * as z from "zod";
const url = import.meta.env.VITE_BACKEND_URL as string;

export async function createComment({
  userID,
  postID,
  content,
}: {
  userID: string;
  postID: string;
  content: string;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${userID}/posts/${postID}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          content: content,
        }),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      },
    );

    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw new Error(error.message);
    }

    console.log(responseBody);
    const body = z
      .object({
        comment: commentSchema,
      })
      .parse(responseBody);

    const comment = body.comment;
    return comment;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getPostComments({
  postID,
  pageParam,
}: {
  postID: string;

  pageParam: number;
}) {
  try {
    const response = await fetch(
      `${url}api/posts/${postID}/comments?page=${pageParam}&limit=4`,
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

    const { comments, count, totalCount } = z
      .object({
        comments: commentSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      comments,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function LikeComment({
  postID,
  userID,
  commentID,
}: {
  postID: string;

  userID: string;
  commentID: string;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${userID}/posts/${postID}/comments/${commentID}/like`,
      {
        method: "PATCH",
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
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function unlikeComment({
  postID,
  userID,
  commentID,
}: {
  postID: string;

  userID: string;
  commentID: string;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${userID}/posts/${postID}/comments/${commentID}/unlike`,
      {
        method: "PATCH",
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
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteComment({
  postID,
  userID,
  commentID,
}: {
  postID: string;

  userID: string;
  commentID: string;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${userID}/posts/${postID}/comments/${commentID}`,
      {
        method: "DELETE",
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
  } catch (e) {
    throw e;
  }
}
export async function editComment({
  postID,
  userID,
  commentID,
  content,
}: {
  postID: string;
  content: string;
  userID: string;
  commentID: string;
}) {
  try {
    const response = await fetch(
      `${url}api/users/${userID}/posts/${postID}/comments/${commentID}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          content,
        }),
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
  } catch (e) {
    throw e;
  }
}

export async function getAdminComments({ pageParam }: { pageParam: number }) {
  try {
    const response = await fetch(
      `${url}api/comments/admin-comments?page=${pageParam}`,
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

    const { comments, count, totalCount } = z
      .object({
        comments: commentSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      comments,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getCommentsStats() {
  try {
    const response = await fetch(`${url}api/comments/get-stats`, {
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

    const { totalComments, totalCommentsLastMonth } = z
      .object({
        totalComments: z.number(),
        totalCommentsLastMonth: z.number(),
      })
      .parse(responseBody);

    return {
      totalComments,
      totalCommentsLastMonth,
    };
  } catch (e) {
    throw e;
  }
}
