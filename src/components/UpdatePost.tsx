import { useMutation } from "@tanstack/react-query";
import { Pencil, Upload } from "lucide-react";
import { ChangeEvent, createRef, useEffect, useState } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { Post, PostForm, PostFormError } from "../types";
import { queryClient } from "../utils/clientQuery";
import { ACCEPTED_IMAGE_TYPES } from "../utils/constants";
import { getImageURL } from "../utils/imageUrl";
import { getCookie } from "../utils/token";
import H3 from "./reusable/typography/H3";
interface Prop {
  singlePost: Post;
}

const UpdatePost = ({ singlePost }: Prop) => {
  const [post, setPost] = useState<PostForm>({
    image: null,
    caption: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const [formError, setFormError] = useState<PostFormError>({
    image: "",
    caption: "",
  });

  const cropperRef = createRef<ReactCropperElement>();

  useEffect(() => {
    if (singlePost.imageUrl) {
      setImagePreview(getImageURL(singlePost.imageUrl));
    }
    if (singlePost.caption) {
      setPost((post) => ({ ...post, caption: singlePost.caption }));
    }
  }, [singlePost.imageUrl, singlePost.caption]);

  const { hideModal } = useModalContext();

  const token = getCookie("token");

  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePosts", singlePost.id],
    mutationFn: (data: FormData) =>
      fetch(`${import.meta.env.VITE_API}/post/${singlePost.id}`, {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.json();
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", singlePost.id] });
      toast.success("Post Updated");
      hideModal();
      setPost({ image: null, caption: "" });
      setImagePreview("");
    },
  });

  const createPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (post.image) formData.append("image", post.image);
    formData.append("caption", post.caption || "");

    mutate(formData);
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
  const onCropStart = () => {
    if (!post.image) {
      return;
    }
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
    <div className="flex flex-col gap-4">
      <H3>Update Post</H3>
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
            <div className="absolute right-3 top-3 flex justify-center gap-3">
              <label
                className="cursor-pointer rounded-md bg-blue p-2 text-center text-white transition-colors duration-200 hover:bg-dark-blue"
                htmlFor="image"
              >
                <Pencil size={16} />
              </label>
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
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue text-white transition-colors duration-200 hover:bg-light-gray">
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
            className="w-full resize-none rounded-md border-2 border-light-gray p-4 outline-none placeholder:text-black"
            onChange={handleCaptionChange}
            maxLength={150}
            value={post.caption}
          />
          {formError.caption && (
            <span className="text-red-600">{formError.caption}</span>
          )}
        </div>

        <button
          className="w-full rounded-md bg-blue p-3 text-white transition-colors duration-200 hover:bg-dark-blue disabled:cursor-not-allowed disabled:bg-light-gray disabled:text-black"
          disabled={isPending}
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
