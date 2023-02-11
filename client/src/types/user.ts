export type UserRoleType = 'admin' | 'author' | 'user';

export const UserRole = ['admin', 'author', 'user'] as const;

// export interface INewUserValues {
//   name: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface IUserInfo {
//   userId: string;
//   username: string;
//   name: string;
// }

export interface INewUserResponse {
  message: string;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  userId: string;
  name: string;
  email: string;
}
