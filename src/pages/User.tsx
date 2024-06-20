import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import UserDetails from "../components/reusable/UserDetails";
import UserPosts from "../components/UserPosts";
import { UserResult } from "../types";

const User = () => {
  const { username } = useParams() as { username: string };
  const { isLoading, error, data } = useQuery<UserResult>({
    queryKey: ["user", username],
    queryFn: () =>
      fetch(`http://localhost:3000/api/user/${username}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;

  const user = data.data;

  /**
   * TODO:
   * 404 page
   * cropper
   * put backend url in .env
   * query in page
   *
   */

  if (!user) {
    return <p>No user Found</p>;
  }
  return (
    <div className="m-auto mt-10 flex w-10/12 flex-col gap-20 md:max-w-1350">
      <UserDetails user={user} />
      <UserPosts userId={user.id} />
    </div>
  );
};

export default User;
