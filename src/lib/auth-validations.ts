import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email obrigatório")
        .email("Digite um email válido"),

    password: z
        .string()
        .min(1, "Senha obrigatória"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "Nome obrigatório"),
        email: z
            .string()
            .min(1, "Email obrigatório")
            .email("Digite um email válido"),

        password: z
            .string()
            .min(8, "Mínimo de 8 caracteres")
            .regex(/[A-Z]/, "Deve conter letra maiúscula")
            .regex(/[a-z]/, "Deve conter letra minúscula"),

        confirmPassword: z.string(),
    })
    .refine(
        (data) =>
            data.password === data.confirmPassword,
        {
            message: "As senhas não coincidem",
            path: ["confirmPassword"],
        }
    );

export type RegisterInput = z.infer<
    typeof registerSchema
>;