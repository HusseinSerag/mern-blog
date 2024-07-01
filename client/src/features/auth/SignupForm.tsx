import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForms";
import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useGo from "../../hooks/useGo";
import OAuthGoogle from "./OAuthGoogle";

export interface SignUp {
  email: string;
  password: string;
  username: string;
}
export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>();
  const { isSigningUp, registerUser } = useSignup();
  const go = useGo();
  function handleSubmission(values: SignUp) {
    if (!isSigningUp)
      registerUser(values, {
        onSuccess: () => {
          toast.success("Registration successful");
          go("/");
        },
      });
  }
  return (
    <AuthForm>
      <form
        onSubmit={handleSubmit(handleSubmission)}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="username" value="Your username" />
          <TextInput
            {...register("username", {
              required: "This field is required",
            })}
            type="text"
            placeholder="Username..."
            id="username"
          />
          {errors.username && (
            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="email
            "
            value="Your email
            "
          />
          <TextInput
            type="email"
            id="email
            "
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password" value="Your password" />
          <TextInput
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password should be atleast 6 characters!",
              },
            })}
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {isSigningUp ? (
          <div className="flex items-center justify-center">
            <Loader height="60" width="60" />
          </div>
        ) : (
          <>
            <Button
              type="submit"
              disabled={isSigningUp}
              gradientDuoTone={"purpleToPink"}
            >
              Sign Up
            </Button>
            <OAuthGoogle />
          </>
        )}
      </form>
      <div className="mt-4 flex gap-2 text-sm">
        <span className="dark:text-white">Have an account?</span>
        <Link className="text-blue-500" to={"/signin"}>
          Sign in
        </Link>
      </div>
    </AuthForm>
  );
}
