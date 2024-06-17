import { useQuery } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import { useAuthContext } from "../context/AuthContext";
import { PostResult } from "../types";
import { getDate } from "../utils/date";
import { getImageURL } from "../utils/imageUrl";

const SinglePost = () => {
  const { postId } = useParams();
  const { loggedUser } = useAuthContext();

  const { isLoading, error, data } = useQuery<PostResult>({
    queryKey: ["post", postId],
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
    <>
      <NavBar />
      <div className="lg:max-w-600 m-auto my-5 flex w-10/12 flex-col items-start gap-5 py-3">
        <div className="flex w-full items-end justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-light-gray"></div>
            <div>
              <p className="font-semibold">{post.user.username}</p>
              <p>{date}</p>
            </div>
          </div>
          {loggedUser === post.user.id && (
            <button>
              <Ellipsis strokeWidth={3} />
            </button>
          )}
        </div>
        <div className="w-full rounded-md shadow-md">
          <img src={getImageURL(post.imageUrl)} className="m-auto rounded-md" />
        </div>
        <div className="flex gap-3">
          <p className="font-semibold">{post.user.username}</p>
          {post.caption && <p>{post.caption}</p>}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
