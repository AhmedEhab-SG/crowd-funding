import { Response } from "express";
import { LoginUser, RegisterUser } from "../types/user";
import client from "../db";
import { compare, hash } from "bcrypt";
import { decode, sign } from "jsonwebtoken";
import { setHttpTokensCookie, verifyToken } from "../utils/auth";
import { DecodeUser, Tokens } from "../types/auth";

const registerService = async (res: Response, registerUser: RegisterUser) => {
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

    await client.user.create({ data: registerUser });

    res.status(201).json({ message: "Account created" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginService = async (res: Response, loginUser: LoginUser) => {
  try {
    const foundUser = await client.user.findFirst({
      where: { email: loginUser.email },
    });

    if (!foundUser) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    const passwordMatch = await compare(loginUser.password, foundUser.password);

    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid credentials" });
      return;
    }

    setHttpTokensCookie(
      res,
      sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_ACCESS_TOKEN!,
        {
          expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
        }
      ),
      sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        {
          expiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN,
        }
      )
    );

    delete (foundUser as { password?: string }).password;

    res.status(200).json({ user: foundUser });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshService = async (res: Response, tokens: Tokens) => {
  try {
    const { refreshToken, accessToken: expiredAccessToken } = tokens;

    if (!refreshToken || !expiredAccessToken) {
      res.status(403).json({ message: "requried a refresh and access token" });
      return;
    }

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

    setHttpTokensCookie(
      res,
      sign({ id, email }, process.env.JWT_SECRET_ACCESS_TOKEN!, {
        expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRES_IN,
      })
    );

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerService, loginService, refreshService };
