export interface Post {
  caption: string;
  createdAt: string;
  id: number;
  imageName: string;
  imageUrl: string;
  updatedAt: string;
}

export interface PostResult {
  posts: Post[];
}
