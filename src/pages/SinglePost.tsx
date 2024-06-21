import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import DropDownMenu from "../components/DropDownMenu";
import NotFound from "../components/NotFound";
import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import { useAuthContext } from "../context/AuthContext";
import { SinglePostResult } from "../types";
import { getDate } from "../utils/date";
import { getImageURL } from "../utils/imageUrl";
import { getInitials } from "../utils/profile";

const SinglePost = () => {
  const { postId } = useParams();
  const { loggedUser } = useAuthContext();

  const { isLoading, error, data } = useQuery<SinglePostResult>({
    queryKey: ["post", Number(postId)],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API}/post/${postId}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <Loading />;

  if (error) return <ErrorComponent />;

  if (!data) return <NotFound />;

  const post = data.data;
  const date = getDate(post.createdAt);

  return (
    <div className="relative m-auto my-5 flex w-10/12 flex-col items-start gap-5 py-3 lg:max-w-600">
      <div className="flex w-full items-end justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={
              loggedUser === post.user.id
                ? `/profile`
                : `/user/${post.user.username}`
            }
          >
            <div className="h-10 w-10">
              {post.user.imageUrl ? (
                <img
                  src={getImageURL(post.user.imageUrl)}
                  className="h-full w-full rounded-full"
                />
              ) : (
                <div className="flex h-full items-center justify-center rounded-full bg-light-gray uppercase text-white">
                  {getInitials(post.user.firstName, post.user.lastName)}
                </div>
              )}
            </div>
          </Link>
          <div>
            <Link
              to={
                loggedUser === post.user.id
                  ? `/profile`
                  : `/user/${post.user.username}`
              }
            >
              <p className="font-semibold">{post.user.username}</p>
            </Link>
            <p>{date}</p>
          </div>
        </div>
        {loggedUser === post.user.id && <DropDownMenu post={post} />}
      </div>
      <div className="aspect-[16/9] w-full rounded-md shadow-md">
        <img
          src={getImageURL(post.imageUrl)}
          className="h-full w-full rounded-md object-cover object-center"
        />
      </div>
      <div>
        <Link
          to={
            loggedUser === post.user.id
              ? `/profile`
              : `/user/${post.user.username}`
          }
        >
          <span className="font-semibold">{post.user.username}</span>
        </Link>
        {post.caption && (
          <span className="break-all">&nbsp;&nbsp;{post.caption}</span>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
