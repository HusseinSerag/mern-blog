import { Link } from "react-router-dom";
interface LogoProps {
  size?: string;
}
export default function Logo({ size = "text-sm sm:text-xl" }: LogoProps) {
  return (
    <Link
      className={`self-center whitespace-nowrap ${size} font-semibold dark:text-white`}
      to={"/"}
    >
      <span className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-white">
        Hussein's
      </span>
      Blog
    </Link>
  );
}
