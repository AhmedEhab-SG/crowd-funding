import { User as PrismaUser } from "@prisma/client";

type User = PrismaUser & {
  accessToken?: string;
  refreshToken?: string;
};

export type { User };
