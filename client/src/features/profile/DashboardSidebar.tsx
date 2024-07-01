import { Sidebar } from "flowbite-react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useLogout } from "../auth/useLogout";
import { toast } from "react-toastify";
import useUser from "../auth/useUser";

export function DashboardSidebar() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { isLoggingOut, logout } = useLogout();
  const { user } = useUser();
  if (!tab) {
    return <Navigate to={"/dashboard?tab=profile"} />;
  }

  function signout() {
    if (!isLoggingOut)
      logout("" as unknown as void, {
        onSuccess: () => {
          toast.success("Logout successful");
        },
      });
  }
  return (
    <div>
      <Sidebar className="w-full md:w-60" aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {user?.role === "admin" && (
              <>
                <Sidebar.Item
                  className="cursor-pointer"
                  icon={HiChartPie}
                  active={tab === "dash"}
                  as="div"
                >
                  <Link className="block w-full" to={"/dashboard?tab=dash"}>
                    Dashboard
                  </Link>
                </Sidebar.Item>
              </>
            )}
            <Sidebar.Item
              icon={HiUser}
              as="div"
              active={tab === "profile"}
              label={user?.role === "admin" ? "Pro" : "Free"}
            >
              <Link className="block w-full" to={"/dashboard?tab=profile"}>
                Profile
              </Link>
            </Sidebar.Item>
            {user?.role === "admin" && (
              <>
                <Sidebar.Item
                  className="cursor-pointer"
                  icon={HiDocumentText}
                  active={tab === "posts"}
                  as="div"
                >
                  <Link className="block w-full" to={"/dashboard?tab=posts"}>
                    Posts
                  </Link>
                </Sidebar.Item>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <Sidebar.Item
                  className="cursor-pointer"
                  icon={HiOutlineUserGroup}
                  active={tab === "users"}
                  as="div"
                >
                  <Link className="block w-full" to={"/dashboard?tab=users"}>
                    Users
                  </Link>
                </Sidebar.Item>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <Sidebar.Item
                  className="cursor-pointer"
                  icon={HiAnnotation}
                  active={tab === "comments"}
                  as="div"
                >
                  <Link className="block w-full" to={"/dashboard?tab=comments"}>
                    Comments
                  </Link>
                </Sidebar.Item>
              </>
            )}
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
              <button
                onClick={signout}
                className="disabled:cursor-not-allowed"
                disabled={isLoggingOut}
              >
                Sign out
              </button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
