import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForms";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import { toast } from "react-toastify";
import useGo from "../../hooks/useGo";
import OAuthGoogle from "./OAuthGoogle";
import Loader from "../../components/Loader";

export interface Signin {
  email: string;
  password: string;
}
export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signin>();
  const { isLoggingIn, login } = useLogin();
  const go = useGo();
  function handleSubmission(values: Signin) {
    if (!isLoggingIn) {
      login(values, {
        onSuccess: () => {
          toast.success("Logged in successfully");
          go("/");
        },
      });
    }
  }
  return (
    <AuthForm>
      <form
        onSubmit={handleSubmit(handleSubmission)}
        className="flex flex-col gap-4"
      >
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
            <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>
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
            <p className="mt-2 text-sm text-red-700">
              {errors.password.message}
            </p>
          )}
        </div>
        {isLoggingIn ? (
          <div className="flex items-center justify-center">
            <Loader height="60" width="60" />
          </div>
        ) : (
          <>
            <Button type="submit" gradientDuoTone={"purpleToPink"}>
              login
            </Button>
            <OAuthGoogle />
          </>
        )}
      </form>
      <div className="mt-4 flex gap-2 text-sm">
        <span className="dark:text-white">Don't have an account?</span>
        <Link className="text-blue-500" to={"/signup"}>
          Sign up
        </Link>
      </div>
    </AuthForm>
  );
}
