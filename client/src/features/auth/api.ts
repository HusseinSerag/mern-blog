import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ErrorSchema } from "../../types/ErrorApiSchema";
import { userSchema } from "../../types/User";
import { Signin } from "./SigninForm";
import { SignUp } from "./SignupForm";
import * as z from "zod";
import { auth } from "../../config/firebase";

const url = import.meta.env.VITE_BACKEND_URL as string;

export async function signup(values: SignUp) {
  try {
    const response = await fetch(`${url}api/users/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
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

export async function loginUser(values: Signin) {
  try {
    const response = await fetch(`${url}api/users/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
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

export async function getMe() {
  try {
    const response = await fetch(`${url}api/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    const responseBody = await response.json();
    if (!response.ok) {
      const error = ErrorSchema.parse(responseBody);
      return null;
    }

    const user = z
      .object({
        user: userSchema,
      })
      .parse(responseBody);

    return user.user;
  } catch (e) {
    throw e;
  }
}

export async function googleAuth() {
  const provider = new GoogleAuthProvider();
  try {
    const user = await signInWithPopup(auth, provider);
    provider.setCustomParameters({ prompt: "select_account" });
    const {
      user: { displayName, email, photoURL },
    } = user;
    const response = await fetch(`${url}api/users/google`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: displayName,
        email,
        photoURL,
      }),
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

export async function logoutUser() {
  try {
    const response = await fetch(`${url}api/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
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
