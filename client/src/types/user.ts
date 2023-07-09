export type UserRoleType = 'admin' | 'author' | 'user';

export const UserRole = ['admin', 'author', 'user'] as const;

export interface NewUserResponse {
  message: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  profilePic: string | null;
}
