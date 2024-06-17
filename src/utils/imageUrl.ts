export const getImageURL = (image: string) => {
  return `http://localhost:3000/${image.replace("public\\", "")}`;
};
