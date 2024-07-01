import Loader from "./Loader";

export default function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900">
      <Loader height="70" width="70" />
    </div>
  );
}
