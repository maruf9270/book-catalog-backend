import z from "zod";
const authVlaidator = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const loginValidator = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const tokenValidator = z.object({
  cookies: z.object({
    user: z.string({ required_error: "Cookie is required" }),
  }),
});
export const AuthValidator = { authVlaidator, loginValidator, tokenValidator };
