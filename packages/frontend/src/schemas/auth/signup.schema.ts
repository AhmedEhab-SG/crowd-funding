import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "name must be at least 3 characters." })
      .max(50, { message: "name must be less than 50 characters." }),

    email: z
      .string()
      .email({ message: "Email must contain the @ symbol and a domain name." })
      .min(1, { message: "Email is required." })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Email must contain the @ symbol and a domain name.",
      }),

    confirmEmail: z
      .string()
      .email({
        message: "Confirm Email must contain the @ symbol and a domain name.",
      })
      .min(1, { message: "Email is required." })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Confirm Email must contain the @ symbol and a domain name.",
      }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 5 characters." })
      .max(50, { message: "Password must be less than 50 characters." }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)

    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 5 characters." })
      .max(50, {
        message: "Confirm Password must be less than 50 characters.",
      }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    // ),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and Confirm Password do not match.",
    path: ["confirmPassword"],
  })
  .refine(({ email, confirmEmail }) => email === confirmEmail, {
    message: "Email and Confirm Email do not match.",
    path: ["confirmEmail"],
  });

export default signupSchema;
