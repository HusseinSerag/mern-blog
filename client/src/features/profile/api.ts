import { ErrorSchema } from "../../types/ErrorApiSchema";

const url = import.meta.env.VITE_BACKEND_URL as string;

export async function editUser(formData: FormData) {
  try {
    const response = await fetch(`${url}api/users`, {
      method: "PATCH",
      body: formData,
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

export async function deleteUser() {
  try {
    const response = await fetch(`${url}api/users`, {
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
