import { Request, Response } from "express";
import registerSchema from "../schemas/auth/register.schema";
import { LoginUser, RegisterUser } from "../types/user";
import {
  loginService,
  refreshService,
  registerService,
} from "../services/auth.service";
import logInSchema from "../schemas/auth/login.schema";
import { getHttpTokensHeader } from "../utils/auth";

const registerController = async (req: Request, res: Response) => {
  try {
    const user = req.body as RegisterUser;

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
    const user = req.body as LoginUser;

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
    const tokens = getHttpTokensHeader(req);
    await refreshService(res, tokens);
  } catch (err) {
    res.status(400).json({ message: "something went wrong" });
  }
};

export { loginController, registerController, refreshController };
