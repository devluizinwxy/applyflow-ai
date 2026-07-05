"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaLinkedin, FaFacebook } from "react-icons/fa";

export function SocialButtons() {
    const router = useRouter();
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    async function handleSocialLogin(provider: string) {
        // Pede a conta simulada para o usuário
        const userEmail = prompt(`Enter your ${provider} account email:`);

        // Se o usuário cancelar ou deixar em branco, não faz nada
        if (userEmail === null) return;

        if (!userEmail) {
            alert("Email is required!");
            return;
        }

        // Validação simples idêntica ao padrão adotado
        if (!userEmail.includes("@") || userEmail.includes(" ") || /^\d+$/.test(userEmail.split("@")[0])) {
            alert("Invalid email format!");
            return;
        }

        try {
            // Ativa o loading apenas no botão que foi clicado
            setLoadingProvider(provider);
            
            // Simula o tempo de resposta da autenticação social
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            // Redireciona para o dashboard
            router.push("/dashboard");
        } catch (error) {
            console.error(`Error authenticating with ${provider}:`, error);
        } finally {
            setLoadingProvider(null);
        }
    }

    const buttonClass = `
        flex
        items-center
        justify-center
        gap-2
        h-10
        rounded-md
        border
        border-slate-200
        bg-white
        text-sm
        text-black
        cursor-pointer
        transition-colors
        hover:bg-slate-50
        disabled:opacity-60
        disabled:cursor-not-allowed
    `;

    return (
        <div className="grid grid-cols-2 gap-3">
            {/* GOOGLE */}
            <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={loadingProvider !== null}
                className={buttonClass}
            >
                {loadingProvider === "Google" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                ) : (
                    <FcGoogle size={19} />
                )}
                {loadingProvider === "Google" ? "Connecting..." : "Sign in with Google"}
            </button>

            {/* APPLE */}
            <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                disabled={loadingProvider !== null}
                className={buttonClass}
            >
                {loadingProvider === "Apple" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                ) : (
                    <FaApple size={19} />
                )}
                {loadingProvider === "Apple" ? "Connecting..." : "Sign in with Apple"}
            </button>

            {/* LINKEDIN */}
            <button
                type="button"
                onClick={() => handleSocialLogin("LinkedIn")}
                disabled={loadingProvider !== null}
                className={buttonClass}
            >
                {loadingProvider === "LinkedIn" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                ) : (
                    <FaLinkedin size={19} className="text-[#0A66C2]" />
                )}
                {loadingProvider === "LinkedIn" ? "Connecting..." : "Sign in with LinkedIn"}
            </button>

            {/* FACEBOOK */}
            <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={loadingProvider !== null}
                className={buttonClass}
            >
                {loadingProvider === "Facebook" ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
                ) : (
                    <FaFacebook size={19} className="text-[#1877F2]" />
                )}
                {loadingProvider === "Facebook" ? "Connecting..." : "Sign in with Facebook"}
            </button>
        </div>
    );
}