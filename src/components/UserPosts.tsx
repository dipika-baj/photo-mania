import { useInfiniteQuery } from "@tanstack/react-query";

import { PostResult } from "../types";
import ErrorComponent from "./reusable/ErrorComponent";
import Loading from "./reusable/Loading";
import PostGrid from "./reusable/PostGrid";
interface Prop {
  userId: number;
}

const UserPosts = ({ userId }: Prop) => {
  const { isLoading, error, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PostResult>({
      queryKey: ["userPosts", userId],
      queryFn: ({ pageParam }) =>
        fetch(
          `${import.meta.env.VITE_API}/user/${userId}/posts?page=${pageParam}&pageSize=12`,
        ).then((res) => res.json()),
      getNextPageParam: (lastPage) => {
        if (
          !lastPage.pagination.totalPages ||
          lastPage.pagination.totalPages === lastPage.pagination.page
        ) {
          return undefined;
        }
        return lastPage.pagination.page + 1;
      },
      initialPageParam: 1,
    });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;

  const posts = data.pages.flatMap((page) => {
    return page.data;
  });

  if (!posts.length) {
    return <p className="text-center">No posts yet!!</p>;
  }

  return (
    <PostGrid
      posts={posts}
      loading={isLoading}
      hasNextPage={hasNextPage}
      loadMore={fetchNextPage}
      includeUser={false}
    />
  );
};

export default UserPosts;
