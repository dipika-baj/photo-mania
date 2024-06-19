import { Link } from "react-router-dom";

import { Post } from "../../types";
import { getImageURL } from "../../utils/imageUrl";
import { getInitials } from "../../utils/profile";

interface Prop {
  post: Post;
  includeUser: boolean;
}

const PostGridItem = ({ post, includeUser }: Prop) => {
  return (
    <div className="flex flex-col justify-end gap-2">
      <Link to={`/post/${post.id}`}>
        <div className="aspect-square w-full rounded-md shadow-md">
          <img
            src={getImageURL(post.imageUrl)}
            alt={post.imageName}
            className="h-full w-full rounded-md object-fill object-center"
          />
        </div>
      </Link>

      {includeUser && (
        <div className="flex items-center gap-2">
          <Link to={`user/${post.user.username}`}>
            <div className="h-8 w-8">
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
          <Link to={`user/${post.user.username}`}>
            <p>{post.user.username}</p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default PostGridItem;
