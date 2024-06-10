import { useState } from "react";
import { useQuery } from "react-query";

import reactLogo from "./assets/react.svg";
import { PostResult } from "./types";

function App() {
  const [count, setCount] = useState(0);

  const { isLoading, error, data } = useQuery<PostResult>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("http://localhost:3000/api/post/").then((res) => res.json()),
  });

  if (isLoading) return <div>"Loading..."</div>;

  if (error) return <div>"Error has occured"</div>;

  const posts = data!.posts;

  if (!posts.length) {
    return <>No Posts</>;
  }

  return (
    <>
      <div className="m-0 flex flex-col items-center p-10">
        <img src={reactLogo} className="w-10" alt="React logo" />
        <p className="m-0 p-10 text-center">Test</p>

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="flex flex-col items-center">
        {posts.map((post) => {
          const postImage = post.imageUrl.replace("public\\", "");
          return (
            <div key={post.id} className="my-2 flex gap-2">
              <img
                src={`http://localhost:3000/${postImage}`}
                alt={post.imageName}
                className="h-auto w-40"
              />
              <div>
                <p>{post.caption}</p>
                <p>{post.createdAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
