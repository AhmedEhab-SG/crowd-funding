import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must contain the @ symbol and a domain name." })
    .min(1, { message: "Email is required." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
      message: "Email must contain the @ symbol and a domain name.",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(50, { message: "Password must be less than 50 characters." }),
});

export default loginSchema;
