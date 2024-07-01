import { Button } from "flowbite-react";

import { BsGoogle } from "react-icons/bs";
import { useGoogleAuth } from "./useGoogleAuth";
import { toast } from "react-toastify";
import useGo from "../../hooks/useGo";

export default function OAuthGoogle() {
  const { isPending, signInWithGoogle } = useGoogleAuth();
  const go = useGo();
  async function onClick() {
    if (!isPending) {
      signInWithGoogle("" as unknown as void, {
        onSuccess: () => {
          toast.success("Authentication successful!");
          go("/");
        },
      });
    }
  }
  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      outline
      gradientDuoTone={"pinkToOrange"}
    >
      <div className="flex items-center justify-center gap-4">
        <BsGoogle />
        <span>Continue with Google</span>
      </div>
    </Button>
  );
}
