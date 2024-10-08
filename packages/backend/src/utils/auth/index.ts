import { CookieOptions, Request, Response } from "express";
import variables from "./variables";
import { verify } from "jsonwebtoken";
import { Tokens } from "../../types/auth";

const setHttpTokensCookie = (
  res: Response,
  accessToken?: string,
  refreshToken?: string,
  options: {
    accessTokenOptions?: CookieOptions;
    refreshTokenOptions?: CookieOptions;
  } = {
    accessTokenOptions: {
      httpOnly: true,
      maxAge: 10,
      expires: new Date(Date.now() + 10),
    },
    refreshTokenOptions: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      expires: new Date(Date.now() + 60 * 60 * 24 * 7),
      secure: true,
      sameSite: "strict",
    },
  }
) => {
  accessToken &&
    res.cookie(variables.access, accessToken, options.accessTokenOptions!);

  refreshToken &&
    res.cookie(variables.refresh, refreshToken, options.refreshTokenOptions!);
};

const getHttpTokensHeader = (req: Request) => {
  let tokens = { accessToken: null, refreshToken: null } as Tokens;

  const authHeader = req.headers[variables.authorization] as string;

  if (authHeader && authHeader.startsWith(variables.bearer)) {
    const refreshToken = authHeader.substring(
      variables.bearer.length,
      authHeader.length
    );
    tokens.accessToken = refreshToken;
  }

  tokens.refreshToken = (req.headers[variables.refresh] as string) || null;

  return tokens;
};

const verifyToken = (token: string, secret: string) => {
  try {
    verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

export { setHttpTokensCookie, getHttpTokensHeader, verifyToken };
