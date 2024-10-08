import { NextFunction, Request, Response } from "express";
import { getHttpTokensHeader, verifyToken } from "../utils/auth";
import { decode } from "jsonwebtoken";
import { DecodeUser } from "../types/auth";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = getHttpTokensHeader(req);

    if (!accessToken) {
      res.status(404).json({ message: "requried a access token" });
      return;
    }

    const ok = verifyToken(accessToken, process.env.JWT_SECRET_ACCESS_TOKEN!);

    if (!ok) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.accessToken = accessToken;

    req.userInfo = decode(accessToken) as DecodeUser;

    next();
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export default auth;
