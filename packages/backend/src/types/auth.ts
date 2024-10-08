type DecodeUser = {
  id: string;
  email: string;
};

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export { DecodeUser, Tokens };
