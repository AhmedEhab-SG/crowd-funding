type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginUser = {
  email: string;
  password: string;
};

export type { User, RegisterUser, LoginUser };
