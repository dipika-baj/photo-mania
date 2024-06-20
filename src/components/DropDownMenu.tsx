import { Ellipsis } from "lucide-react";
import { useRef, useState } from "react";

import { useModalContext } from "../context/ModalContext";
import { useClickOutside } from "../hooks/useOutsideClick";
import { ActiveModal, Post } from "../types";
import DeletePost from "./DeletePost";
import Modal from "./reusable/Modal";
import Seperator from "./reusable/Seperator";
import UpdatePost from "./UpdatePost";

interface Prop {
  post: Post;
}

const DropDownMenu = ({ post }: Prop) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropDownRef, () => {
    setDropDown(false);
  });
  const { showModal, setShowModal } = useModalContext();

  return (
    <>
      <button onClick={() => setDropDown((prev) => !prev)}>
        <Ellipsis strokeWidth={3} />
      </button>
      {dropDown && (
        <div
          ref={dropDownRef}
          className="absolute right-0 top-[18%] z-50 flex flex-col rounded-md border border-light-gray bg-white shadow-2xl sm:top-[12%] md:min-w-200"
        >
          <button
            onClick={() => {
              setShowModal(ActiveModal.editPost);
              setDropDown(false);
            }}
            className="px-4 py-2 text-left hover:bg-light-gray"
          >
            Edit
          </button>
          <Seperator />
          <button
            onClick={() => {
              setShowModal(ActiveModal.deletePost);
              setDropDown(false);
            }}
            className="px-4 py-2 text-left text-red-500 hover:bg-light-gray"
          >
            Delete
          </button>
        </div>
      )}

      {showModal === ActiveModal.editPost && (
        <Modal>
          <UpdatePost singlePost={post} />
        </Modal>
      )}

      {showModal === ActiveModal.deletePost && (
        <Modal>
          <DeletePost postId={post.id} />
        </Modal>
      )}
    </>
  );
};

export default DropDownMenu;
