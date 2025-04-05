export interface IApiError {
  data?: {
    error?: string;
  };
  status?: number;
}

export interface IUser{
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  bio?: string;
  phoneNumber: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpires?: Date;
  verifyToken?: string;
  verifyTokenExpires?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersState {
  users: IUser[];
  total: number;
  page: number;
  limit: number;
}

export const initialState: UsersState = {
  users: [],
  total: 0,
  page: 1,
  limit: 10,
};

