import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  TextInput,
  useThemeMode,
} from "flowbite-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Logo from "./Logo";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import useUser from "../features/auth/useUser";
import { HiUser, HiLogout } from "react-icons/hi";
import { useLogout } from "../features/auth/useLogout";
import { toast } from "react-toastify";
import { FormEvent, FormEventHandler, useState } from "react";
import useGo from "../hooks/useGo";
export default function Header() {
  const { toggleMode, mode } = useThemeMode();
  const { pathname } = useLocation();
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout();

  const go = useGo();
  const [search, setSearch] = useState("");

  function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!search) {
      toast.error("Please provide a search term");
      return;
    }
    go(`/search?search=${search}`);
    setSearch("");
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
    <Navbar className="border-b-2" fluid rounded>
      <Logo />
      <form onSubmit={onSearch}>
        <TextInput
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          pill
          color={"gray"}
          className="flex h-10 w-12 items-center justify-center lg:hidden"
        >
          <AiOutlineSearch />
        </Button>
      </form>

      <div className="flex gap-2 md:order-2">
        <Button
          onClick={toggleMode}
          color="gray"
          className="hidden h-10 w-12 sm:inline"
          pill
        >
          {mode === "light" && <FaMoon />}
          {mode === "dark" && <FaSun />}
        </Button>
        {!user ? (
          <Link to={"/signup"}>
            <Button outline gradientDuoTone={"purpleToBlue"}>
              Sign up
            </Button>
          </Link>
        ) : (
          <>
            <Dropdown
              renderTrigger={() => (
                <div>
                  <Avatar
                    img={
                      user.photoURL ||
                      "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere.png"
                    }
                    alt={`avatar of ${user.username}`}
                    rounded
                  />
                </div>
              )}
              dismissOnClick={false}
              label=""
            >
              <Dropdown.Header>
                <span className="block text-sm">@{user.username}</span>
                <span className="block truncate text-sm font-semibold">
                  {user.email}
                </span>
              </Dropdown.Header>

              <Dropdown.Item icon={HiUser}>
                <Link to={"/dashboard?tab=profile"}>Profile</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item
                onClick={signout}
                disabled={isLoggingOut}
                icon={HiLogout}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </>
        )}
      </div>

      <Navbar.Toggle />
      <Navbar.Collapse className="md:order-1">
        <Navbar.Link
          as={"div"}
          active={pathname === "/"}
          className="cursor-pointer"
        >
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link
          as={"div"}
          active={pathname === "/about"}
          className="cursor-pointer"
        >
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link
          as={"div"}
          active={pathname === "/projects"}
          className="cursor-pointer"
        >
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
