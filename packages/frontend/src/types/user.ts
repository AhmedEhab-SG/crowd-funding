type User = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string | null;
  websites: string[] | null;
};

type Session = User & {
  accessToken: string;
};

export type { User, Session };
