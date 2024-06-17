export interface Post {
  caption: string;
  createdAt: string;
  id: number;
  imageName: string;
  imageUrl: string;
  updatedAt: string;
  user: User;
}

export interface User {
  id: number;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  username: string;
}

export interface Pagination {
  count: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

export interface PostResult {
  data: Post[];
  pagination: Pagination;
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

export interface LoginData {
  id: number;
  emailUsername: string;
  token: string;
}

export interface LoginResult {
  status: string;
  data: LoginData;
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
