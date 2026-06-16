"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginInput & Partial<RegisterInput>>({

    });

    const password = watch("password") ?? "";
    const confirmPassword = watch("confirmPassword") ?? "";

    async function onSubmit(
        data: LoginInput | RegisterInput
    ) {
        try {
            setIsLoading(true);

            console.log(data);

            await new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {isRegister && (
                <div className="space-y-2">
                    <Label htmlFor="fullName">
                        Full Name
                    </Label>

                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="h-8 border-slate-300 focus-visible:ring-cyan-500"
                        {...register("fullName")}
                    />

                    {errors.fullName && (
                        <p className="text-sm text-red-500">
                            {String(errors.fullName.message)}
                        </p>
                    )}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">
                    Email Address
                </Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="john@email.com"
                    className="h-11 border-slate-300 focus-visible:ring-cyan-500"
                    {...register("email")}
                />

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {String(errors.email.message)}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">
                    Password
                </Label>

                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="h-8 border-slate-300 focus-visible:ring-cyan-500"
                    {...register("password")}
                />

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
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>

                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="********"
                            className="h-8 border-slate-300 focus-visible:ring-cyan-500"
                            {...register("confirmPassword")}
                        />

                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">
                                {String(
                                    errors.confirmPassword.message
                                )}
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
                className="
          h-11
          w-full
          bg-cyan-500
          text-white
          font-medium
          hover:bg-cyan-600
        "
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
            <span
                className="
                h-4
                w-4
                animate-spin
                rounded-full
                border-2
                border-white
                border-t-transparent
              "
            />

                        {isRegister
                            ? "Creating Account..."
                            : "Logging in..."}
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
            {isRegister
                ? "Or sign up with"
                : "Or sign in with"}
          </span>
                </div>
            </div>

            <SocialButtons />
        </form>
    );
}