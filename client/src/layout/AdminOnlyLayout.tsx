import { Navigate, Outlet } from "react-router-dom";
import useUser from "../features/auth/useUser";

export default function AdminOnlyLayout() {
  const { user } = useUser();

  if (user?.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}
