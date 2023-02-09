export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  userId: string;
  email: string;
  name: string;
  role: string;
  isAuthenticated?: boolean;
}

export * from './author';
export * from './blog';
export * from './comment';
export * from './rating';
export * from './reaction';
export * from './user';
