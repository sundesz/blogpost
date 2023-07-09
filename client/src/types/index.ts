import { UserRoleType } from './user';

export interface LoginAttributes {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  name: string;
  role: UserRoleType;
  isAuthenticated?: boolean;
  profilePic: string | null;
}

export * from './author';
export * from './blog';
export * from './comment';
export * from './rating';
export * from './reaction';
export * from './user';
export * from './pagination';
