import { Outlet } from "react-router-dom";
import useUser from "../features/auth/useUser";
import FullPageLoader from "../components/FullPageLoader";

export default function LoadUser() {
  const { isLoading } = useUser();
  if (isLoading) return <FullPageLoader />;
  return (
    <>
      <Outlet />
    </>
  );
}
