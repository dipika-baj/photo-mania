import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";

import { useModalContext } from "../../context/ModalContext";
import { useClickOutside } from "../../hooks/useOutsideClick";
import { ActiveModal, User } from "../../types";
import { getImageURL } from "../../utils/imageUrl";
import { getInitials } from "../../utils/profile";
import EditProfilePicture from "../EditProfilePicture";
import Modal from "./Modal";
import Seperator from "./Seperator";
import H1 from "./typography/H1";

interface Prop {
  user: User;
  showUpload?: boolean;
}
1;
const UserDetails = ({ user, showUpload }: Prop) => {
  const [dropDown, setDropDown] = useState(false);
  const { showModal, setShowModal } = useModalContext();

  const dropDownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropDownRef, () => {
    setDropDown(false);
  });

  const hasProfilePicture = !!user.imageUrl;

  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <div className="relative aspect-square w-200 rounded-full border-2 border-light-gray">
          {user.imageUrl ? (
            <img src={getImageURL(user.imageUrl)} className="rounded-full" />
          ) : (
            <div className="flex h-200 w-200 items-center justify-center rounded-full bg-light-gray text-4xl font-bold uppercase text-white">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
          {showUpload && (
            <>
              <button
                onClick={() => setDropDown((prev) => !prev)}
                className="absolute bottom-[7%] right-[7%] flex h-8 w-8 items-center justify-center rounded-full bg-blue text-white"
              >
                <ImagePlus size={20} />
              </button>
              {dropDown && (
                <div
                  ref={dropDownRef}
                  className="absolute right-0 top-[95%] z-50 flex w-10/12 flex-col rounded-md border border-light-gray bg-white shadow-2xl md:min-w-200"
                >
                  <button
                    onClick={() => {
                      setShowModal(ActiveModal.updateProfilePic);
                      setDropDown(false);
                    }}
                    className="px-4 py-2 text-left hover:bg-light-gray"
                  >
                    {hasProfilePicture ? "Change Image" : "Upload Image"}
                  </button>
                  {hasProfilePicture && (
                    <>
                      <Seperator />
                      <button
                        onClick={() => setDropDown(false)}
                        className="px-4 py-2 text-left hover:bg-light-gray"
                      >
                        Remove Image
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full text-center md:w-1/2 md:text-left">
          <div className="capitalize">
            <H1>
              {user.firstName}&nbsp;{user.lastName}
            </H1>
          </div>
          <h2 className="md:text-2xl">{user.username}</h2>
        </div>
      </div>

      {showModal === ActiveModal.updateProfilePic && (
        <Modal>
          <EditProfilePicture
            image={hasProfilePicture ? getImageURL(user.imageUrl) : null}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        </Modal>
      )}
    </>
  );
};
export default UserDetails;
