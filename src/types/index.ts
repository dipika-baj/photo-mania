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

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  emailUsername: string;
  password: string;
}

export interface PostForm {
  image: File | null;
  caption?: string;
}

export interface ErrorResponse {
  status: string;
  code?: string;
  message: string;
}

export interface PostFormError {
  image?: string;
  caption?: string;
}
