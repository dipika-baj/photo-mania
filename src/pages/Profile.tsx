import { useQuery } from "@tanstack/react-query";

import ErrorComponent from "../components/reusable/ErrorComponent";
import Loading from "../components/reusable/Loading";
import Modal from "../components/reusable/Modal";
import UserDetails from "../components/reusable/UserDetails";
import EditProfile from "../components/UpdateProfile";
import UserPosts from "../components/UserPosts";
import { useModalContext } from "../context/ModalContext";
import { ActiveModal, UserResult } from "../types";
import { getCookie } from "../utils/token";

const Profile = () => {
  const token = getCookie("token");
  const { showModal, setShowModal } = useModalContext();

  const { isLoading, error, data } = useQuery<UserResult>({
    queryKey: ["loggedUser"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/me/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          setShowModal(ActiveModal.login);
        }
        return res.json();
      }),
  });

  if (isLoading) return <Loading />;

  if (error || !data) return <ErrorComponent />;

  const user = data.data;

  if (!user) {
    return <p>No user Found</p>;
  }
  return (
    <>
      <div className="m-auto flex w-10/12 flex-col gap-20 md:max-w-1350">
        <div className="flex items-center gap-8">
          <UserDetails user={user} />
          <button
            onClick={() => setShowModal(ActiveModal.editProfile)}
            className="rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-light-gray hover:text-black"
          >
            Edit Profile
          </button>
        </div>
        <UserPosts userId={user.id} />
      </div>
      {showModal === ActiveModal.editProfile && (
        <Modal>
          <EditProfile />
        </Modal>
      )}
    </>
  );
};

export default Profile;
