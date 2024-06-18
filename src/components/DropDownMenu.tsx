import { Ellipsis } from "lucide-react";
import { useState } from "react";

import { useModalContext } from "../context/ModalContext";
import { ActiveModal, Post } from "../types";
import DeletePost from "./DeletePost";
import Modal from "./reusable/Modal";
import UpdatePost from "./UpdatePost";

interface Prop {
  post: Post;
}

const DropDownMenu = ({ post }: Prop) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { showModal, setShowModal } = useModalContext();
  return (
    <>
      <button onClick={() => setDropDown((prev) => !prev)}>
        <Ellipsis strokeWidth={3} />
      </button>
      {dropDown && (
        <div className="absolute right-0 flex translate-y-full flex-col rounded-md bg-white shadow-2xl">
          <button
            onClick={() => {
              setShowModal(ActiveModal.editPost);
              setDropDown(false);
            }}
            className="border-b border-light-gray px-6 py-2 hover:bg-light-gray"
          >
            Update
          </button>
          <button
            onClick={() => {
              setShowModal(ActiveModal.deletePost);
              setDropDown(false);
            }}
            className="px-6 py-2 text-red-600 hover:bg-light-gray"
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
