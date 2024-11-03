import { Response } from "express";
import { Login, Register } from "../types/auth";
import client from "../db";
import { compare, hash } from "bcrypt";
import { decode, sign } from "jsonwebtoken";
import {
  deleteHttpRefreshToken,
  setHeaderAccessToken,
  setHttpRefreshToken,
  verifyToken,
} from "../utils/auth";
import { DecodeUser } from "../types/auth";

const registerService = async (res: Response, registerUser: Register) => {
  try {
    const foundUser = await client.user.findFirst({
      where: { email: registerUser.email },
    });

    if (foundUser) {
      res.status(403).json({ message: "Account already exists" });
      return;
    }

    registerUser.password = await hash(registerUser.password, 10);

    delete (registerUser as { confirmPassword?: string }).confirmPassword;
    delete (registerUser as { confirmEmail?: string }).confirmEmail;

    await client.user.create({ data: registerUser });

    res.status(201).json({ message: "Account created" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginService = async (res: Response, login: Login) => {
  try {
    const foundUser = await client.user.findFirst({
      where: { email: login.email },
    });

    if (!foundUser) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    const passwordMatch = await compare(login.password, foundUser.password);

    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    delete (foundUser as { password?: string }).password;

    setHttpRefreshToken(
      res,
      sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        {
          expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN,
        }
      ),
      { remember: login.rememberMe }
    );

    setHeaderAccessToken(
      res,
      sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_ACCESS_TOKEN!,
        {
          expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
        }
      )
    );

    res.status(200).json({ user: foundUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshService = async (
  res: Response,
  refreshToken: string,
  expiredAccessToken: string
) => {
  try {
    const ok = verifyToken(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN!);

    if (!ok) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    const { id, email } = decode(refreshToken) as DecodeUser;
    const { id: expired_id, email: expiredEmail } = decode(
      expiredAccessToken
    ) as DecodeUser;

    if (id !== expired_id || email !== expiredEmail) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    setHttpRefreshToken(
      res,
      sign({ id, email }, process.env.JWT_SECRET_REFRESH_TOKEN!, {
        expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN,
      })
    );

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const revokeRefreshService = async (res: Response, refreshToken: string) => {
  try {
    const ok = verifyToken(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN!);

    if (!ok) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    deleteHttpRefreshToken(res);

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerService, loginService, refreshService, revokeRefreshService };
