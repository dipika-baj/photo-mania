import Upload from "../icons/Upload";

const CreatePost = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">Create New Post</h2>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-light-gray p-4 md:p-16">
          <input type="file" id="image" className="hidden" />
          <label
            htmlFor="image"
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-blue text-white transition-colors duration-200 hover:bg-light-gray"
          >
            <Upload />
          </label>
          <label htmlFor="image">
            <span className="cursor-pointer font-bold transition-colors duration-200 hover:text-blue">
              Click
            </span>
            to upload an image
          </label>
        </div>
        <textarea
          rows={6}
          placeholder="Caption"
          className="w-full rounded-md border-2 border-light-gray p-4 outline-none placeholder:text-black"
        ></textarea>
        <input
          type="submit"
          value={"Create Post"}
          className="w-full cursor-pointer rounded-md bg-pink p-3 text-white transition-colors duration-200 hover:bg-dark-pink"
        />
      </form>
    </div>
  );
};
export default CreatePost;
