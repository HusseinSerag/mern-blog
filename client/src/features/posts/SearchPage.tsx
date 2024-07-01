import { useSearchParams } from "react-router-dom";
import FullPageLoader from "../../components/FullPageLoader";
import Loader from "../../components/Loader";
import PostCard from "./PostCard";
import usePosts from "./usePosts";
import { Button, Select, TextInput } from "flowbite-react";

export default function SearchPage() {
  const { fetchNextPage, isFetchingNextPage, isLoading, postData } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  function setParams(key: string, value: string) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }
  function removeParams(...keys: string[]) {
    keys.forEach((key) => {
      searchParams.delete(key);
    });

    setSearchParams(searchParams);
  }

  return (
    <div className="flex w-full flex-col gap-8 space-y-4 p-3 md:flex-row">
      <div className="w-full space-y-4 border-r-slate-800 md:w-[400px]">
        <div>
          By text :
          <TextInput
            onChange={(e) => {
              if (e.target.value === "") removeParams("search");
              else setParams("search", e.target.value);
            }}
          />
        </div>
        <div>
          sort:{" "}
          <Select onChange={(e) => setParams("sort", e.target.value)}>
            <option value={`-createdAt`}>oldest</option>
            <option value={`createdAt`}>earliest</option>
            <option value={`title`}>ascending alphabetically</option>
            <option value={`-title`}>descending alphabetically</option>
          </Select>
        </div>
        <div className="space-y-2">
          category:{" "}
          <Select onChange={(e) => setParams("category", e.target.value)}>
            <option value="uncategorized">uncategorized</option>
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <Button
          outline
          gradientDuoTone="purpleToPink"
          onClick={() => removeParams("sort", "category")}
        >
          reset filters
        </Button>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <FullPageLoader />
          </div>
        ) : (
          <>
            <div className="mb-4 space-y-4 text-center">
              <h1 className="text-2xl font-semibold">
                Total Articles found: {postData.totalCount}
              </h1>
              {postData.posts!.length > 0 && (
                <h2>Showing now {postData.posts?.length} results</h2>
              )}
            </div>

            <div className="flex w-full flex-wrap justify-center gap-4 md:px-12">
              {postData.posts && postData.posts.length > 0 ? (
                postData.posts?.map((post) => (
                  <PostCard post={post} key={post._id} />
                ))
              ) : (
                <p>No results found!</p>
              )}

              <div className="w-full">
                {postData.posts!.length < postData.totalCount! &&
                  !isFetchingNextPage && (
                    <button
                      onClick={() => fetchNextPage()}
                      className="w-full self-center py-7 text-sm text-teal-500"
                    >
                      Show more
                    </button>
                  )}
                {isFetchingNextPage && (
                  <div className="my-7 flex items-center justify-center">
                    <Loader height="30" width="30" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
