"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 
import { Eye, EyeOff } from "lucide-react";

import {
    loginSchema,
    registerSchema,
    LoginInput,
    RegisterInput,
} from "@/lib/auth-validations";

import { PasswordChecklist } from "./PasswordChecklist";
import { SocialButtons } from "./SocialButtons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
    type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
    const isRegister = type === "register";
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInput & Partial<RegisterInput>>({
        resolver: zodResolver(isRegister ? registerSchema : loginSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password") ?? "";
    const confirmPassword = watch("confirmPassword") ?? "";

    const fullNameReg = register("fullName");
    const emailReg = register("email");
    const passwordReg = register("password");
    const confirmPasswordReg = register("confirmPassword");

    async function onSubmit(data: LoginInput | RegisterInput) {
        try {
            setIsLoading(true);
            console.log(data);

            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push("/dashboard");
            
        } catch (error) {
            console.error("Erro ao autenticar:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {isRegister && (
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        className={`h-8 border-slate-300 text-slate-900 focus-visible:ring-cyan-500 ${
                            errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        name={fullNameReg.name}
                        onChange={fullNameReg.onChange}
                        onBlur={fullNameReg.onBlur}
                        ref={fullNameReg.ref}
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-500">
                            {String(errors.fullName.message)}
                        </p>
                    )}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    className={`h-11 border-slate-300 text-slate-900 focus-visible:ring-cyan-500 ${
                        errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                    }`}
                    name={emailReg.name}
                    onChange={emailReg.onChange}
                    onBlur={emailReg.onBlur}
                    ref={emailReg.ref}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">
                        {String(errors.email.message)}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        className={`h-8 border-slate-300 text-slate-900 pr-10 focus-visible:ring-cyan-500 ${
                            errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        name={passwordReg.name}
                        onChange={passwordReg.onChange}
                        onBlur={passwordReg.onBlur}
                        ref={passwordReg.ref}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-sm text-red-500">
                        {String(errors.password.message)}
                    </p>
                )}
            </div>

            {!isRegister && (
                <div className="flex justify-end">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-cyan-500 hover:text-cyan-600"
                    >
                        Forgot password?
                    </Link>
                </div>
            )}

            {isRegister && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                className={`h-8 border-slate-300 text-slate-900 pr-10 focus-visible:ring-cyan-500 ${
                                    errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""
                                }`}
                                name={confirmPasswordReg.name}
                                onChange={confirmPasswordReg.onChange}
                                onBlur={confirmPasswordReg.onBlur}
                                ref={confirmPasswordReg.ref}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {String(errors.confirmPassword.message)}
                            </p>
                        )}
                    </div>

                    <PasswordChecklist
                        password={password}
                        confirmPassword={confirmPassword}
                    />
                </>
            )}

            <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full bg-cyan-500 text-white font-medium hover:bg-cyan-600"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        {isRegister ? "Creating Account..." : "Logging in..."}
                    </span>
                ) : isRegister ? (
                    "Create Account"
                ) : (
                    "Login"
                )}
            </Button>

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs uppercase text-slate-400">
                        {isRegister ? "Or sign up with" : "Or sign in with"}
                    </span>
                </div>
            </div>

            <SocialButtons />
        </form>
    );
}