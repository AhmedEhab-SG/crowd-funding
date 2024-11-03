import { Request, Response } from "express";
import registerSchema from "../schemas/auth/register.schema";
import { Login, Register } from "../types/auth";
import {
  loginService,
  refreshService,
  registerService,
  revokeRefreshService,
} from "../services/auth.service";
import logInSchema from "../schemas/auth/login.schema";
import { getHeaderAccessToken, getHttpRefreshToken } from "../utils/auth";

const registerController = async (req: Request, res: Response) => {
  try {
    const user = req.body as Register;

    const safeUser = registerSchema.safeParse(user);

    if (!safeUser.success) {
      res.status(403).json({
        error: safeUser.error?.format(),
      });
      return;
    }

    await registerService(res, safeUser.data);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const user = req.body as Login;

    const safeUser = logInSchema.safeParse(user);

    if (safeUser.error) {
      res.status(403).json({
        error: safeUser.error?.format(),
      });
      return;
    }

    await loginService(res, safeUser.data);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const refreshController = async (req: Request, res: Response) => {
  try {
    const refreshToken = getHttpRefreshToken(req);
    const accessToken = getHeaderAccessToken(req);

    if (!refreshToken || !accessToken) {
      res.status(404).json({ message: "tokens are requried" });
      return;
    }

    await refreshService(res, refreshToken, accessToken);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

const revokeRefreshController = async (req: Request, res: Response) => {
  try {
    const refreshToken = getHttpRefreshToken(req);

    if (!refreshToken) {
      res.status(404).json({ message: "refresh token are requried" });
      return;
    }

    await revokeRefreshService(res, refreshToken);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export {
  loginController,
  registerController,
  refreshController,
  revokeRefreshController,
};
