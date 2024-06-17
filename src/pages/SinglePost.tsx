import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import { PostResult } from "../types";
import { getDate } from "../utils/date";
import { getImageURL } from "../utils/imageUrl";

const SinglePost = () => {
  const { postId } = useParams();

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
      <div className="md:max-w-800 m-auto my-5 flex w-10/12 flex-col items-start gap-3 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-light-gray"></div>
          <div>
            <p className="font-semibold">{post.user.username}</p>
            <p>{date}</p>
          </div>
        </div>
        <img src={getImageURL(post.imageUrl)} className="w-full rounded-md" />
        {post.caption && <p>{post.caption}</p>}
      </div>
    </>
  );
};

export default SinglePost;
