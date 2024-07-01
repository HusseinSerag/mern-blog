import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  return {
    user,
    isLoading,
  };
}
