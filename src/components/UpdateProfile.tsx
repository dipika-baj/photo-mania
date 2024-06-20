import { User } from "../types";
import UpdateProfileForm from "./UpdateProfileForm";

const EditProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">Update Profile</h2>

      <UpdateProfileForm
        firstName={user.firstName}
        lastName={user.lastName}
        username={user.username}
      />
    </div>
  );
};
export default EditProfile;
