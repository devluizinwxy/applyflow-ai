"use client";

import React, { useState } from 'react';

export default function LinkedinIntegrationPage() {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");

  const handleToggleConnect = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
      }, 2000);
    } else if (status === "connected") {
      if (confirm("Deseja realmente desconectar sua conta do LinkedIn?")) {
        setStatus("disconnected");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 bg-transparent transition-colors duration-300">
      
      {/* Card Ampliado mantendo a Responsividade */}
      <div className="w-full max-w-[640px] bg-white dark:bg-[#121B33] border border-slate-100 dark:border-slate-800/60 rounded-2xl p-10 md:p-12 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
        
        {/* Logo do ApplyFlow AI */}
        <div className="flex items-center gap-2 mb-12">
          <img 
            src="/images/logo.PNG" 
            alt="ApplyFlow Logo" 
            className="w-8 h-8 object-contain"
          />
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            ApplyFlow AI
          </span>
        </div>

        {/* Título e Descrição */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          LinkedIn Integration
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-8">
          Link your LinkedIn profile to automatically import job history and populate application forms.
        </p>

        {/* Pílula de Status Reativa */}
        <div className="mb-10">
          {status === "disconnected" && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-[#1A2647] rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/30">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Status: Not Connected
            </div>
          )}
          {status === "connecting" && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 animate-pulse">
              <div className="w-2 h-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Status: Connecting...
            </div>
          )}
          {status === "connected" && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Status: Connected
            </div>
          )}
        </div>

        {/* Botão de Ação Principal */}
        <button
          onClick={handleToggleConnect}
          disabled={status === "connecting"}
          className={`w-full max-w-lg flex items-center justify-center gap-2.5 text-white font-medium py-3.5 px-6 rounded-xl text-base transition-all shadow-sm ${
            status === "connected" 
              ? "bg-red-500 hover:bg-red-600 shadow-red-100 dark:shadow-none" 
              : "bg-[#5A9ED4] hover:bg-[#4A8EC4] disabled:opacity-70"
          }`}
        >
          {status !== "connected" ? (
            <>
              {/* Ícone Customizado do LinkedIn */}
              <div className="w-4.5 h-4.5 bg-white text-[#5A9ED4] rounded-sm flex items-center justify-center font-bold text-[11px] leading-none shrink-0 pb-[1px] px-1">
                in
              </div>
              {status === "connecting" ? "Connecting to LinkedIn..." : "Connect LinkedIn"}
            </>
          ) : (
            "Disconnect LinkedIn Account"
          )}
        </button>

        {/* Linha Divisória Sutil */}
        <div className="w-full border-t border-slate-100 dark:border-slate-800/60 my-10" />

        {/* Nota de Segurança Inferior */}
        <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 text-left leading-relaxed max-w-lg">
          <strong className="text-slate-700 dark:text-slate-300 font-semibold">Security Note:</strong> Your login credentials and personal data are encrypted and handled securely. Only public-facing information and specified fields will be imported.
        </p>

      </div>
    </div>
  );
}