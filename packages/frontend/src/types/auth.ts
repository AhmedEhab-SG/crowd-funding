import { z } from "zod";
import loginSchema from "../schemas/auth/login.schema";
import signupSchema from "../schemas/auth/signup.schema";

type Login = z.infer<typeof loginSchema>;

type Signup = z.infer<typeof signupSchema>;

export type { Login, Signup };
