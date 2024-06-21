import { useMutation } from "@tanstack/react-query";
import { PencilIcon, Upload, X } from "lucide-react";
import { ChangeEvent, createRef, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { PostForm, PostFormError } from "../types";
import { queryClient } from "../utils/clientQuery";
import { ACCEPTED_IMAGE_TYPES } from "../utils/constants";
import { getCookie } from "../utils/token";
import H3 from "./reusable/typography/H3";

const CreatePost = () => {
  const [post, setPost] = useState<PostForm>({
    image: null,
    caption: "",
  });
  const [formError, setFormError] = useState<PostFormError>({
    image: "",
    caption: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const { hideModal } = useModalContext();
  const token = getCookie("token");
  const cropperRef = createRef<ReactCropperElement>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["createPosts"],
    mutationFn: (data: FormData) =>
      fetch(`${import.meta.env.VITE_API}/post/create`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.json();
      }),

    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
        toast.success("Post created");
        hideModal();
      }
    },

    onError: () => {
      toast.error("Post could not be created");
      hideModal();
    },
  });

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post.image) {
      setFormError((error) => ({
        ...error,
        image: "Image cannot be empty",
      }));
    } else {
      const formData = new FormData();
      formData.append("image", post.image);
      if (post.caption) formData.append("caption", post?.caption);
      mutate(formData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    if (selectedFiles) {
      if (!ACCEPTED_IMAGE_TYPES.includes(selectedFiles[0].type)) {
        setFormError((error) => ({
          ...error,
          image: "Only JPEG and PNG images are allowed",
        }));
      } else {
        setPost((post) => ({
          ...post,
          image: selectedFiles[0],
        }));
        setFormError((error) => ({
          ...error,
          image: "",
        }));
        setImagePreview(URL.createObjectURL(selectedFiles[0]));
      }
    }
  };

  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const caption = e.target.value;
    if (caption.length >= 150) {
      setFormError((error) => ({
        ...error,
        caption: "Caption cannot exceed 150 character",
      }));
    } else {
      setFormError((error) => ({
        ...error,
        caption: "",
      }));
      setPost((post) => ({
        ...post,
        caption: caption,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setPost((post) => ({
      ...post,
      image: null,
    }));
  };

  const onCropStart = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          const file = new File([blob], post.image!.name, {
            type: post.image!.type,
          });
          setPost((post) => ({ ...post, image: file }));
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <H3>Create New Post</H3>
        <form className="flex flex-col gap-4" onSubmit={createPost}>
          {imagePreview ? (
            <div className="relative flex flex-col gap-4">
              <Cropper
                style={{ width: "100%", maxHeight: "400px" }}
                ref={cropperRef}
                aspectRatio={16 / 9}
                src={imagePreview}
                guides={true}
                crop={onCropStart}
                viewMode={1}
                autoCropArea={1}
              />
              <div className="absolute right-3 top-3 flex flex-col items-center gap-3">
                <label
                  className="cursor-pointer rounded-md bg-blue p-2 text-center text-white transition-colors duration-200 hover:bg-dark-blue"
                  htmlFor="image"
                >
                  <PencilIcon size={16} />
                </label>
                <button
                  className="rounded-md bg-light-gray p-2 text-black transition-colors duration-200 hover:bg-dark-gray"
                  onClick={handleRemoveImage}
                >
                  <X size={16} />
                </button>
              </div>

              <input
                type="file"
                id="image"
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="image"
                className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-light-gray p-4 md:p-16"
              >
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageChange}
                />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white transition-colors duration-200 hover:bg-dark-blue">
                  <Upload />
                </div>
                <p>
                  <span className="font-bold transition-colors duration-200 hover:text-blue">
                    Click
                  </span>
                  &nbsp;to upload an image
                </p>
              </label>
              {formError.image && (
                <span className="text-red-600">{formError.image}</span>
              )}
            </div>
          )}
          <div>
            <textarea
              rows={5}
              placeholder="Caption"
              className="w-full resize-none rounded-md border-2 border-light-gray p-4 outline-none"
              onChange={handleCaptionChange}
              maxLength={150}
            />
            {formError.caption && (
              <span className="text-red-600">{formError.caption}</span>
            )}
          </div>

          <button
            className="w-full rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
            disabled={isPending}
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};
export default CreatePost;
