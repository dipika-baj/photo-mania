import { Link } from "react-router-dom";

import { Post } from "../../types";
import { getImageURL } from "../../utils/imageUrl";

const PostGridItem = ({ post }: { post: Post }) => {
  const postImage = post.imageUrl.replace("public\\", "");

  return (
    <div className="flex flex-col justify-end gap-2">
      <Link to={`/post/${post.id}`}>
        <div className="aspect-square w-full rounded-md shadow-md">
          <img
            src={getImageURL(postImage)}
            alt={post.imageName}
            className="h-full w-full rounded-md object-fill object-center"
          />
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-light-gray"></div>
        <p>{post.user.username}</p>
      </div>
    </div>
  );
};
export default PostGridItem;
