import { useQuery } from "@tanstack/react-query";

import { UserResult } from "../types";
import { getCookie } from "../utils/token";
import ErrorComponent from "./reusable/ErrorComponent";
import Loading from "./reusable/Loading";
import UpdateProfileForm from "./UpdateProfileForm";

const EditProfile = () => {
  const token = getCookie("token");

  const { isLoading, error, data } = useQuery<UserResult>({
    queryKey: ["userDetails"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;

  const userDetails = data.data;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">Update Profile</h2>
      <UpdateProfileForm
        firstName={userDetails.firstName}
        lastName={userDetails.lastName}
        username={userDetails.username}
      />
    </div>
  );
};
export default EditProfile;
