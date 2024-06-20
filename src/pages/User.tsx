import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import NotFound from "../components/NotFound";
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
      fetch(`${import.meta.env.VITE_API}/user/${username}`).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;

  const user = data.data;

  if (!user) {
    return <NotFound />;
  }
  return (
    <div className="m-auto mt-10 flex w-10/12 flex-col gap-20 md:max-w-1350">
      <UserDetails user={user} />
      <UserPosts userId={user.id} />
    </div>
  );
};

export default User;
