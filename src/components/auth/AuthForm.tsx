"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation"; 
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaLinkedin, FaFacebook } from "react-icons/fa";

import {
    loginSchema,
    registerSchema,
    LoginInput,
    RegisterInput,
} from "@/lib/auth-validations";

import { PasswordChecklist } from "./PasswordChecklist";

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
    const [showSocialPassword, setShowSocialPassword] = useState(false);
    
    // Estados para a simulação do Forgot Password
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotSuccess, setForgotSuccess] = useState(false);
    const [forgotError, setForgotError] = useState("");

    // Estados para a simulação do Social Login
    const [activeSocialProvider, setActiveSocialProvider] = useState<string | null>(null);
    const [socialEmail, setSocialEmail] = useState("");
    const [socialPassword, setSocialPassword] = useState("");
    const [socialEmailError, setSocialEmailError] = useState("");
    const [socialPasswordError, setSocialPasswordError] = useState("");

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

    // Envio do e-mail de recuperação
    async function handleForgotSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!forgotEmail) {
            setForgotError("Email is required");
            return;
        }
        if (!forgotEmail.includes("@") || forgotEmail.includes(" ") || /^\d+$/.test(forgotEmail.split("@")[0])) {
            setForgotError("Invalid email format");
            return;
        }

        try {
            setIsLoading(true);
            setForgotError("");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setForgotSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    // Envio simulado do Social Login com as mesmas validações
    async function handleSocialSubmit(e: React.FormEvent) {
        e.preventDefault();
        let hasError = false;

        // Validação do E-mail Social
        if (!socialEmail) {
            setSocialEmailError("Email is required");
            hasError = true;
        } else if (!socialEmail.includes("@") || socialEmail.includes(" ") || /^\d+$/.test(socialEmail.split("@")[0])) {
            setSocialEmailError("Invalid email format");
            hasError = true;
        } else {
            setSocialEmailError("");
        }

        // Validação da Senha Social
        if (!socialPassword) {
            setSocialPasswordError("Password is required");
            hasError = true;
        } else if (socialPassword.length < 8) {
            setSocialPasswordError("Minimum format is 8 characters");
            hasError = true;
        } else {
            setSocialPasswordError("");
        }

        if (hasError) return;

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    function resetSocialState() {
        setActiveSocialProvider(null);
        setSocialEmail("");
        setSocialPassword("");
        setSocialEmailError("");
        setSocialPasswordError("");
    }

    const socialButtonClass = `
        flex items-center justify-center gap-2 h-10 rounded-md border border-slate-200 
        bg-white text-sm text-black cursor-pointer transition-colors hover:bg-slate-50
    `;

    // 1. TELA DE RECUPEÇÃO DE SENHA
    if (isForgotPassword) {
        return (
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={() => {
                        setIsForgotPassword(false);
                        setForgotSuccess(false);
                        setForgotEmail("");
                        setForgotError("");
                    }}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to login
                </button>

                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900">Reset Password</h2>
                    <p className="text-sm text-slate-500">
                        Enter your email address to receive a verification code.
                    </p>
                </div>

                {forgotSuccess ? (
                    <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
                        <p className="text-sm text-emerald-800 font-medium">
                            A verification code has been successfully sent to <span className="font-semibold">{forgotEmail}</span>. Please check your inbox.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleForgotSubmit} noValidate className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="forgotEmail">Email Address</Label>
                            <Input
                                id="forgotEmail"
                                type="email"
                                placeholder="john@gmail.com"
                                value={forgotEmail}
                                onChange={(e) => {
                                    setForgotEmail(e.target.value);
                                    if (forgotError) setForgotError("");
                                }}
                                className={`h-11 border-slate-300 text-slate-900 focus-visible:ring-cyan-500 ${
                                    forgotError ? "border-red-500 focus-visible:ring-red-500" : ""
                                }`}
                            />
                            {forgotError && (
                                <p className="text-sm text-red-500">{forgotError}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-11 w-full bg-cyan-500 text-white font-medium hover:bg-cyan-600"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Sending code...
                                </span>
                            ) : (
                                "Send Verification Code"
                            )}
                        </Button>
                    </form>
                )}
            </div>
        );
    }

    // 2. TELA DE LOGIN SOCIAL SIMULADO (E-MAIL + PASSWORD)
    if (activeSocialProvider) {
        return (
            <div className="space-y-5">
                <button
                    type="button"
                    onClick={resetSocialState}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to options
                </button>

                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900">Sign in with {activeSocialProvider}</h2>
                    <p className="text-sm text-slate-500">
                        Connect your {activeSocialProvider} account credentials to continue.
                    </p>
                </div>

                <form onSubmit={handleSocialSubmit} noValidate className="space-y-4">
                    {/* Email Social */}
                    <div className="space-y-2">
                        <Label htmlFor="socialEmail">{activeSocialProvider} Email</Label>
                        <Input
                            id="socialEmail"
                            type="email"
                            placeholder="your-account@email.com"
                            value={socialEmail}
                            onChange={(e) => {
                                setSocialEmail(e.target.value);
                                if (socialEmailError) setSocialEmailError("");
                            }}
                            className={`h-11 border-slate-300 text-slate-900 focus-visible:ring-cyan-500 ${
                                socialEmailError ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                        />
                        {socialEmailError && (
                            <p className="text-sm text-red-500">{socialEmailError}</p>
                        )}
                    </div>

                    {/* Senha Social */}
                    <div className="space-y-2">
                        <Label htmlFor="socialPassword">Password</Label>
                        <div className="relative">
                            <Input
                                id="socialPassword"
                                type={showSocialPassword ? "text" : "password"}
                                placeholder="********"
                                value={socialPassword}
                                onChange={(e) => {
                                    setSocialPassword(e.target.value);
                                    if (socialPasswordError) setSocialPasswordError("");
                                }}
                                className={`h-8 border-slate-300 text-slate-900 pr-10 focus-visible:ring-cyan-500 ${
                                    socialPasswordError ? "border-red-500 focus-visible:ring-red-500" : ""
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowSocialPassword(!showSocialPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showSocialPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {socialPasswordError && (
                            <p className="text-sm text-red-500">{socialPasswordError}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-11 w-full bg-cyan-500 text-white font-medium hover:bg-cyan-600"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Connecting to {activeSocialProvider}...
                            </span>
                        ) : (
                            `Continue with ${activeSocialProvider}`
                        )}
                    </Button>
                </form>
            </div>
        );
    }

    // 3. TELA PADRÃO DE LOGIN / CADASTRO
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
                    <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
                    >
                        Forgot password?
                    </button>
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

            {/* Grid dos botões sociais */}
            <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setActiveSocialProvider("Google")} className={socialButtonClass}>
                    <FcGoogle size={19} /> Sign in with Google
                </button>
                <button type="button" onClick={() => setActiveSocialProvider("Apple")} className={socialButtonClass}>
                    <FaApple size={19} /> Sign in with Apple
                </button>
                <button type="button" onClick={() => setActiveSocialProvider("LinkedIn")} className={socialButtonClass}>
                    <FaLinkedin size={19} className="text-[#0A66C2]" /> Sign in with LinkedIn
                </button>
                <button type="button" onClick={() => setActiveSocialProvider("Facebook")} className={socialButtonClass}>
                    <FaFacebook size={19} className="text-[#1877F2]" /> Sign in with Facebook
                </button>
            </div>

            {/* Link de Alternância entre Login e Cadastro totalmente limpo */}
            <div className="text-center pt-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {isRegister ? (
                        <>
                            Already have an account?{" "}
                            <Link 
                                href="/login" 
                                className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 underline-offset-4 hover:underline transition-colors"
                            >
                                Sign in
                            </Link>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <Link 
                                href="/register" 
                                className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 underline-offset-4 hover:underline transition-colors"
                            >
                                Create one
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </form>
    );
}