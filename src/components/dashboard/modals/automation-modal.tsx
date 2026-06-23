"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Rocket, Database, Loader2, Check } from "lucide-react";

interface AutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AutomationModal({ isOpen, onClose }: AutomationModalProps) {
  const [step, setStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setStep(3);
    }, 2500);
  };

  const handleCloseReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
        <button onClick={handleCloseReset} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
          <X className="h-5 w-5" />
        </button>

        {step === 1 && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit"><Rocket className="h-6 w-6" /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Iniciar Nova Automação</h3>
              <p className="text-sm text-slate-500 mt-1">Defina o escopo para as candidaturas de hoje.</p>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selecione o Perfil</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Senior Frontend Engineer (Padrão)</option>
                <option>Fullstack Developer</option>
              </select>
            </div>
            <Button onClick={() => setStep(2)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              {isRunning ? <Loader2 className="h-6 w-6 animate-spin" /> : <Database className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revisar e Lançar</h3>
              <p className="text-sm text-slate-500 mt-1">A IA buscará e aplicará filtros estritos baseados nas suas preferências profissionais.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} disabled={isRunning} className="flex-1 rounded-xl">Voltar</Button>
              <Button onClick={handleStart} disabled={isRunning} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl">
                {isRunning ? "Processando..." : "Lançar Agora"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Check className="h-6 w-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Automação Iniciada!</h3>
              <p className="text-sm text-slate-500 mt-1">O motor do Apply Flow AI está rodando em segundo plano.</p>
            </div>
            <Button onClick={handleCloseReset} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl">
              Entendido
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}