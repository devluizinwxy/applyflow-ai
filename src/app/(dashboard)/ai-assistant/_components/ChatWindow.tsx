"use client";

import React, { useState, useEffect } from 'react';
import { Check, Edit2, RefreshCw, Sparkles } from 'lucide-react';

interface ChatWindowProps {
  currentPrompt: string;
  clearPrompt: () => void;
}

export default function ChatWindow({ currentPrompt, clearPrompt }: ChatWindowProps) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', text: 'How can I help you today? Please enter a prompt below.' }
  ]);
  const [showResponse, setShowResponse] = useState(false);

  // Monitora quando o usuário clica em alguma sugestão externa para injetar no chat
  useEffect(() => {
    if (currentPrompt) {
      setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: currentPrompt }]);
      clearPrompt();
      // Simula a IA gerando resposta logo após
      setTimeout(() => setShowResponse(true), 600);
    }
  }, [currentPrompt, clearPrompt]);

  const handleGenerate = () => {
    if (!showResponse) {
      setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: "Craft a tailored cover letter for a Senior Developer role at Google." }]);
      setTimeout(() => setShowResponse(true), 400);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-[450px]">
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}
          >
            {msg.role === 'system' && (
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1C233D] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#00A3FF]" />
              </div>
            )}
            <div className={`text-sm py-2.5 px-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none shadow-sm' 
                : 'bg-slate-50 dark:bg-[#111C3A] text-slate-700 dark:text-slate-300 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Resposta da IA integrada controlada pelo estado */}
        {showResponse && (
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-[#111C3A]/40 flex flex-col gap-4 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                AI Generated Answer
              </span>
              <div className="text-sm text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
                <p className="font-semibold">Dear Cover Letter,</p>
                <p>I am motivated to write this letter for the Senior Developer role at Google...</p>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => alert("Aprovado!")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-[#1C233D] hover:bg-slate-200 dark:hover:bg-[#252E54] rounded-lg transition-colors">
                <Check className="w-3.5 h-3.5 text-green-500" /> Aprovar
              </button>
              <button onClick={() => alert("Abrir editor de revisão...")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-[#1C233D] hover:bg-slate-200 dark:hover:bg-[#252E54] rounded-lg transition-colors">
                <Edit2 className="w-3.5 h-3.5 text-amber-500" /> Revisar
              </button>
              <button onClick={() => { setShowResponse(false); setTimeout(() => setShowResponse(true), 400); }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-[#1C233D] hover:bg-slate-200 dark:hover:bg-[#252E54] rounded-lg transition-colors">
                <RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Regerar
              </button>
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={handleGenerate}
        className="w-full bg-[#00A3FF] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors text-sm mt-auto"
      >
        Generate Response
      </button>
    </div>
  );
}