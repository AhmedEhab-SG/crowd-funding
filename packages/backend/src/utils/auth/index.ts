import { CookieOptions, Request, Response } from "express";
import variables from "./variables";
import { verify } from "jsonwebtoken";

const setHttpRefreshToken = (
  res: Response,
  refreshToken: string,
  {
    httpOnly = true,
    secure = process.env.NODE_ENV === "production",
    maxAge = 60 * 60 * 24 * 7 * 1000,
    expires = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
    sameSite = "strict",
    remember = false,
  }: CookieOptions & {
    remember?: boolean;
  } = {}
) =>
  res.cookie(variables.refresh, refreshToken, {
    httpOnly,
    secure,
    expires: remember ? expires : undefined,
    maxAge: remember ? maxAge : undefined,
    sameSite,
  });

const getHttpRefreshToken = (req: Request) =>
  (req.cookies[variables.refresh] as string) || null;

const deleteHttpRefreshToken = (res: Response) =>
  res.clearCookie(variables.refresh);

const setHeaderAccessToken = (res: Response, accessToken: string) =>
  res.setHeader(variables.authorization, `${variables.bearer} ${accessToken}`);

const getHeaderAccessToken = (req: Request) => {
  const authorization =
    (req.headers[variables.authorization] as string) || null;

  console.log(req.headers);

  if (!authorization) return null;

  const bearer = authorization.split(" ");

  if (bearer.length !== 2 || bearer[0]?.toLowerCase() !== variables.bearer)
    return null;

  return bearer[1];
};

const verifyToken = (token: string, secret: string) => {
  try {
    verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

export {
  setHeaderAccessToken,
  getHeaderAccessToken,
  verifyToken,
  setHttpRefreshToken,
  getHttpRefreshToken,
  deleteHttpRefreshToken,
};
