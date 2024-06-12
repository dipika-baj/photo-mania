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

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ErrorResponse {
  status: string;
  code?: string;
  message: string;
}
