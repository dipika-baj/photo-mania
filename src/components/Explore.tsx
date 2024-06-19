import { useInfiniteQuery } from "@tanstack/react-query";

import { PostResult } from "../types";
import ErrorComponent from "./reusable/ErrorComponent";
import Loading from "./reusable/Loading";
import PostGrid from "./reusable/PostGrid";

const Explore = () => {
  const { isLoading, error, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PostResult>({
      queryKey: ["posts"],
      queryFn: ({ pageParam }) =>
        fetch(
          `http://localhost:3000/api/post/?page=${pageParam}&pageSize=12`,
        ).then((res) => res.json()),
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.totalPages === lastPage.pagination.page) {
          return undefined;
        }
        return lastPage.pagination.page + 1;
      },
      initialPageParam: 1,
    });

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data) {
    return <ErrorComponent />;
  }

  const posts = data.pages.flatMap((page) => {
    return page.data;
  });

  return (
    <div className="m-auto flex w-10/12 flex-col gap-6 py-3 md:max-w-1350">
      <p className="text-center font-semibold">Explore</p>
      <PostGrid
        posts={posts}
        loading={isLoading}
        hasNextPage={hasNextPage}
        loadMore={fetchNextPage}
      />
    </div>
  );
};

export default Explore;
