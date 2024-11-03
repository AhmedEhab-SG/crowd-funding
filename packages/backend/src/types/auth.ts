type DecodeUser = {
  id: string;
  email: string;
};

import { z } from "zod";
import loginSchema from "../schemas/auth/login.schema";
import registerSchema from "../schemas/auth/register.schema";

type Login = z.infer<typeof loginSchema>;

type Register = z.infer<typeof registerSchema>;

export { DecodeUser, Login, Register };
