import { ErrorSchema } from "../../types/ErrorApiSchema";
import { userSchema } from "../../types/User";
import * as z from "zod";

const url = import.meta.env.VITE_BACKEND_URL as string;

export async function getAllUsers({ pageParam }: { pageParam: number }) {
  try {
    const response = await fetch(`${url}api/users?page=${pageParam}`, {
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

    const { count, users, totalCount } = z
      .object({
        users: userSchema.array(),
        count: z.number(),
        totalCount: z.number(),
      })
      .parse(responseBody);

    return {
      count,
      users,
      totalCount,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function deleteUser(userID: string) {
  try {
    const response = await fetch(`${url}api/users/delete-user/${userID}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      throw new Error(error.message);
    }
  } catch (e) {
    throw e;
  }
}

export async function getUserStats() {
  try {
    const response = await fetch(`${url}api/users/get-stats`, {
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

    console.log(responseBody);
    const { totalUser, totalUserLastMonth } = z
      .object({
        totalUser: z.number(),
        totalUserLastMonth: z.number(),
      })
      .parse(responseBody);

    return {
      totalUser,
      totalUserLastMonth,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}
