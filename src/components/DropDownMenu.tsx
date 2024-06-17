import { Ellipsis } from "lucide-react";
import { useState } from "react";

const DropDownMenu = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setDropDown((prev) => !prev)}>
        <Ellipsis strokeWidth={3} />
      </button>
      {dropDown && (
        <div className="absolute right-0 flex translate-y-full flex-col rounded-md bg-white shadow-2xl">
          <button className="border-b border-light-gray px-6 py-2 hover:bg-light-gray">
            Edit Post
          </button>
          <button className="px-6 py-2 text-red-600 hover:bg-light-gray">
            Delete Post
          </button>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
