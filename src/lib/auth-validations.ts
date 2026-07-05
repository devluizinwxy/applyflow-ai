import { z } from "zod";

// Flexible validation for emails (accepts Gmail, Outlook, Yahoo, etc.)
const emailValidation = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .trim()
    .refine((val) => !/\s/.test(val), {
        message: "Email cannot contain spaces",
    })
    .refine((val) => {
        const username = val.split("@")[0];
        return !/^\d+$/.test(username);
    }, {
        message: "Email cannot contain only numbers before the @",
    });

export const loginSchema = z.object({
    email: emailValidation,
    password: z
        .string()
        .min(8, "Minimum format is 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "Name must be at least 3 characters"),
        email: emailValidation,
        password: z
            .string()
            .min(8, "Minimum format is 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/\d/, "Must contain at least one number"),
        confirmPassword: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;