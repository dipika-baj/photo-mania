import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { useModalContext } from "../context/ModalContext";
import { Post, PostForm, PostFormError } from "../types";
import { queryClient } from "../utils/clientQuery";
import { ACCEPTED_IMAGE_TYPES } from "../utils/constants";
import { getImageURL } from "../utils/imageUrl";
import { getCookie } from "../utils/token";
interface Prop {
  singlePost: Post;
}

//TODO : Use zod and make it reusable

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
      fetch(`http://localhost:3000/api/me/post/${singlePost.id}`, {
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
    if (caption.length === 150) {
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
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">Update Post</h2>
      <form className="flex flex-col gap-4" onSubmit={createPost}>
        {imagePreview ? (
          <div className="flex flex-col gap-4">
            <img className="m-auto max-w-200 md:max-w-300" src={imagePreview} />
            <div className="flex justify-center gap-3">
              <label
                className="cursor-pointer rounded-md bg-blue p-3 text-center text-white transition-colors duration-200 hover:bg-light-gray hover:text-black"
                htmlFor="image"
              >
                Change
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
            rows={6}
            placeholder="Caption"
            className="w-full rounded-md border-2 border-light-gray p-4 outline-none placeholder:text-black"
            onChange={handleCaptionChange}
            maxLength={150}
            value={post.caption}
          />
          {formError.caption && (
            <span className="text-red-600">{formError.caption}</span>
          )}
        </div>

        <button
          className="w-full rounded-md bg-pink p-3 text-white transition-colors duration-200 hover:bg-dark-pink"
          disabled={isPending}
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
