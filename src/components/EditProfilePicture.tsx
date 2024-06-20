import "cropperjs/dist/cropper.css";

import { useMutation } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import { ChangeEvent, createRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
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
  const [newImage, setNewImage] = useState<File | null>(null);
  const [formError, setFormError] = useState<string>();
  const cropperRef = createRef<ReactCropperElement>();
  const token = getCookie("token");
  const { hideModal } = useModalContext();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    if (selectedFiles) {
      if (!ACCEPTED_IMAGE_TYPES.includes(selectedFiles[0].type)) {
        setFormError("Only JPEG and PNG images are allowed");
      } else {
        setNewImage(selectedFiles[0]);
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
      setNewImage(null);
      setImagePreview("");
    },
  });

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (newImage) formData.append("image", newImage);

    mutate(formData);
  };

  const onCropStart = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "cropped_image.png", {
            type: "image/png",
          });
          setNewImage(file);
        }
      });
    }
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={createPost}>
      {imagePreview ? (
        <div className="relative aspect-square w-10/12">
          <Cropper
            style={{ width: "100%" }}
            ref={cropperRef}
            aspectRatio={1}
            src={imagePreview}
            guides={true}
            cropstart={onCropStart}
          />
          <label
            htmlFor="image"
            className="absolute right-4 top-4 cursor-pointer text-light-gray transition-colors duration-200 hover:text-black"
          >
            <PencilIcon />
          </label>
        </div>
      ) : (
        <label htmlFor="image" className="w-10/2 aspect-square rounded-full">
          <div className="flex h-200 w-200 items-center justify-center rounded-full bg-light-gray text-4xl font-bold uppercase text-white">
            {getInitials(firstName, lastName)}
          </div>
        </label>
      )}
      <input
        type="file"
        id="image"
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleImageChange}
      />
      {/* {imagePreview && (
        <Cropper
          style={{ height: 400, width: "100%" }}
          ref={cropperRef}
          initialAspectRatio={1}
          src={imagePreview}
          guides={true}
          cropstart={onCropStart}
        />
      )} */}
      {formError && <span className="text-red-600">{formError}</span>}
      <button
        className="w-full rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray"
        disabled={!newImage}
      >
        Upload
      </button>
    </form>
  );
};
export default EditProfilePicture;
