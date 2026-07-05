import { z } from "zod";

// Validação flexível para e-mails (aceita Gmail, Outlook, Yahoo, etc.)
const emailValidation = z
    .string()
    .min(1, "Email obrigatório")
    .email("Digite um email válido")
    .trim()
    .refine((val) => !/\s/.test(val), {
        message: "O email não pode conter espaços em branco",
    })
    .refine((val) => {
        const username = val.split("@")[0];
        return !/^\d+$/.test(username);
    }, {
        message: "O email não pode conter apenas números antes do @",
    });

export const loginSchema = z.object({
    email: emailValidation,
    // Senha do login agora exige mínimo de 8 caracteres com a sua mensagem
    password: z
        .string()
        .min(8, "O formato mínimo é 8 caracteres"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(3, "O nome deve ter pelo menos 3 caracteres"),
        email: emailValidation,
        password: z
            .string()
            .min(8, "O formato mínimo é 8 caracteres")
            .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
            .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
            .regex(/\d/, "Deve conter pelo menos um número"),
        confirmPassword: z.string().min(1, "Confirmação de senha obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;