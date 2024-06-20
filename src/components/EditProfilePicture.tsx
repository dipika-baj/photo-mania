import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { queryClient } from "../utils/clientQuery";
import { ACCEPTED_IMAGE_TYPES } from "../utils/constants";
import { getInitials } from "../utils/profile";
import { getCookie } from "../utils/token";

interface Prop {
  image: string | null;
  firstName: string;
  lastName: string;
}
const EditProfilePicture = ({ image, firstName, lastName }: Prop) => {
  const [imagePreview, setImagePreview] = useState(image);
  const [newImage, setImage] = useState<File | null>(null);
  const [formError, setFormError] = useState<string>();
  const token = getCookie("token");
  const { hideModal } = useModalContext();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    if (selectedFiles) {
      if (!ACCEPTED_IMAGE_TYPES.includes(selectedFiles[0].type)) {
        setFormError("Only JPEG and PNG images are allowed");
      } else {
        setImage(selectedFiles[0]);
        setFormError("");
        setImagePreview(URL.createObjectURL(selectedFiles[0]));
      }
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["updateProfilePic"],
    mutationFn: (data: FormData) =>
      fetch(`http://localhost:3000/api/me`, {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.json();
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile Picture Updated");
      hideModal();
      setImage(null);
      setImagePreview("");
    },
  });

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (newImage) formData.append("image", newImage);

    mutate(formData);
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={createPost}>
      <label htmlFor={"image"} className="aspect-square w-200 rounded-full">
        {imagePreview ? (
          <img className="rounded-full" src={imagePreview} />
        ) : (
          <div className="flex h-200 w-200 items-center justify-center rounded-full bg-light-gray text-4xl font-bold uppercase text-white">
            {getInitials(firstName, lastName)}
          </div>
        )}
      </label>
      <input
        type="file"
        id="image"
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleImageChange}
      />
      {formError && <span className="text-red-600">{formError}</span>}
      <button
        className="hover:bg-dark-blue w-full rounded-md bg-blue p-3 text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-light-gray"
        disabled={!newImage}
      >
        Upload
      </button>
    </form>
  );
};
export default EditProfilePicture;
