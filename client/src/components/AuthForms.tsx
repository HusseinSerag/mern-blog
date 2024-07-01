import { ReactNode } from "react";
import Logo from "./Logo";

interface AuthFormsProps {
  children: ReactNode;
}
export default function AuthForm({ children }: AuthFormsProps) {
  return (
    <div className="m-auto mt-20 flex max-w-3xl flex-col gap-4 p-3 md:flex-row md:items-center">
      <div className="flex-1">
        <Logo size="text-4xl  " />
        <p className="mt-5 text-sm dark:text-white">
          This is a demo project, you can sign up with your email and password
          or using Google
        </p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
