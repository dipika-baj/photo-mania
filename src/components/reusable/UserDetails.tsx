import { User } from "../../types";
import { getImageURL } from "../../utils/imageUrl";
import { getInitials } from "../../utils/profile";

interface Prop {
  user: User;
}

const UserDetails = ({ user }: Prop) => {
  return (
    <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row">
      <div className="aspect-square w-6/12 rounded-full md:w-200">
        {user.imageUrl ? (
          <img src={getImageURL(user.imageUrl)} className="rounded-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-light-gray text-4xl font-bold uppercase text-white">
            {getInitials(user.firstName, user.lastName)}
          </div>
        )}
      </div>
      <div className="w-full text-center md:w-1/2 md:text-left">
        <h1 className="capitalize md:mb-2 md:text-4xl">
          {user.firstName}&nbsp;{user.lastName}
        </h1>
        <h2 className="md:text-2xl">{user.username}</h2>
      </div>
    </div>
  );
};
export default UserDetails;
