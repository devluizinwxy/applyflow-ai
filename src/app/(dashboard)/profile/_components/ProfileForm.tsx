"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Definição do Schema de Validação com o Zod
const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must have at least 2 characters")
    .max(30, "Too long"),
  lastName: z
    .string()
    .min(2, "Last name must have at least 2 characters")
    .max(30, "Too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address format"),
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "Invalid phone format"),
  linkedinUrl: z
    .string()
    .url("Invalid URL format (must start with https://)")
    .includes("linkedin.com", { message: "Must be a valid LinkedIn link" }),
  portfolioUrl: z
    .string()
    .url("Invalid URL format (must start with https://)"),
  location: z
    .string()
    .min(3, "Location must have at least 3 characters"),
});

// Inferir os tipos gerados pelo Zod
type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  // 2. Inicialização do React Hook Form com o resolver do Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      portfolioUrl: "",
      location: "",
    },
  });

  // 3. Função chamada apenas se o formulário passar por TODOS os testes
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      console.log("Formulário Válido! Enviando dados:", data);
      // Aqui entraria a sua chamada de API para salvar no Banco de dados
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Edit Personal Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nome */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              placeholder="John"
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.firstName 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.firstName && (
              <span className="text-xs text-red-500 mt-1 block">{errors.firstName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Doe"
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.lastName 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.lastName && (
              <span className="text-xs text-red-500 mt-1 block">{errors.lastName.message}</span>
            )}
          </div>
        </div>

        {/* Email e Telefone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.email 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Phone
            </label>
            <input
              {...register("phone")}
              type="text"
              placeholder="+55 (11) 99999-9999"
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.phone 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.phone && (
              <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>
            )}
          </div>
        </div>

        {/* LinkedIn e Portfolio */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              LinkedIn URL
            </label>
            <input
              {...register("linkedinUrl")}
              type="url"
              placeholder="https://linkedin.com/in/..."
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.linkedinUrl 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.linkedinUrl && (
              <span className="text-xs text-red-500 mt-1 block">{errors.linkedinUrl.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
              Portfolio URL
            </label>
            <input
              {...register("portfolioUrl")}
              type="url"
              placeholder="https://myportfolio.com"
              className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
                errors.portfolioUrl 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
              }`}
            />
            {errors.portfolioUrl && (
              <span className="text-xs text-red-500 mt-1 block">{errors.portfolioUrl.message}</span>
            )}
          </div>
        </div>

        {/* Localização */}
        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
            Location
          </label>
          <input
            {...register("location")}
            type="text"
            placeholder="São Paulo, SP"
            className={`w-full h-11 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 focus:outline-none focus:ring-2 transition-colors ${
              errors.location 
                ? "border-red-500 focus:ring-red-500" 
                : "border-slate-300 dark:border-slate-700 focus:ring-sky-500"
            }`}
          />
          {errors.location && (
            <span className="text-xs text-red-500 mt-1 block">{errors.location.message}</span>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400 text-white text-sm font-medium transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}