import useInfiniteScroll from "react-infinite-scroll-hook";

import { Post } from "../../types";
import Loading from "./Loading";
import PostGridItem from "./PostGridItem";
interface Props {
  posts: Post[];
  loading: boolean;
  hasNextPage: boolean;
  loadMore: () => void;
  includeUser?: boolean;
}

const PostGrid = ({
  posts,
  loading,
  loadMore,
  hasNextPage,
  includeUser,
}: Props) => {
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    rootMargin: "0px 0px 20px 0px",
  });

  if (includeUser === undefined) {
    includeUser = true;
  }

  if (!loading && posts.length === 0) {
    return <p className="text-center">No Posts Yet</p>;
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostGridItem key={post.id} post={post} includeUser={includeUser} />
          ))}
        </div>
      </div>
      {hasNextPage && (
        <div ref={infiniteRef}>
          <Loading />
        </div>
      )}
    </>
  );
};
export default PostGrid;
