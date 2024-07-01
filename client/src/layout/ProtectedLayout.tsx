import { Navigate, Outlet } from "react-router-dom";
import useUser from "../features/auth/useUser";

export default function ProtectedLayout() {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={"/signin"} replace />;
  }
  return <Outlet />;
}
