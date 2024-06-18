import { Ellipsis } from "lucide-react";
import { useState } from "react";

import { useModalContext } from "../context/ModalContext";
import { ActiveModal } from "../types";
import Modal from "./reusable/Modal";

const DropDownMenu = () => {
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
          <p>Update</p>
        </Modal>
      )}

      {showModal === ActiveModal.deletePost && (
        <Modal>
          <p>Delete</p>
        </Modal>
      )}
    </>
  );
};

export default DropDownMenu;
