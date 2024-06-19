import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import DropDownMenu from "../components/DropDownMenu";
import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import { useAuthContext } from "../context/AuthContext";
import { PostResult } from "../types";
import { getDate } from "../utils/date";
import { getImageURL } from "../utils/imageUrl";
import { getInitials } from "../utils/profile";

const SinglePost = () => {
  const { postId } = useParams();
  const { loggedUser } = useAuthContext();

  const { isLoading, error, data } = useQuery<PostResult>({
    queryKey: ["post", Number(postId)],
    queryFn: () =>
      fetch(`http://localhost:3000/api/post/${postId}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;
  const post = data.data[0];
  const date = getDate(post.createdAt);

  return (
    <div className="m-auto my-5 flex w-10/12 flex-col items-start gap-5 py-3 lg:max-w-600">
      <div className="relative flex w-full items-end justify-between">
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
      <div className="w-full rounded-md shadow-md">
        <img src={getImageURL(post.imageUrl)} className="m-auto rounded-md" />
      </div>
      <div className="flex gap-3">
        <Link
          to={
            loggedUser === post.user.id
              ? `/profile`
              : `/user/${post.user.username}`
          }
        >
          <p className="font-semibold">{post.user.username}</p>
        </Link>
        {post.caption && <p>{post.caption}</p>}
      </div>
    </div>
  );
};

export default SinglePost;
