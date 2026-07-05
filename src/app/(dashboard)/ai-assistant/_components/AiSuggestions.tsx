"use client";

import React, { useState, useRef } from 'react';
import { Settings, FileText, ChevronRight, File, Trash2 } from 'lucide-react';

interface SuggestionProps {
  onSelectSuggestion: (text: string) => void;
}

export function SuggestionsList({ onSelectSuggestion }: SuggestionProps) {
  const suggestions = ["Improve summary clarity", "Quantify bullet points", "A/B test different job titles"];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 relative">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Suggestions List</h2>
        
        <div className="relative">
          <Settings 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors" 
          />
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#111C3A] border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => toggleTheme('light')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C233D] transition-colors cursor-pointer"
              >
                ☀️ Modo Claro
              </button>
              <button
                onClick={() => toggleTheme('dark')}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C233D] transition-colors cursor-pointer"
              >
                🌙 Modo Noturno
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {suggestions.map((text, i) => (
          <button 
            key={i} 
            onClick={() => onSelectSuggestion(text)}
            className="w-full text-left px-4 py-2.5 bg-slate-50 dark:bg-[#111C3A] hover:bg-slate-100 dark:hover:bg-[#1C233D] rounded-xl text-sm text-slate-700 dark:text-slate-300 transition-colors flex justify-between items-center cursor-pointer"
          >
            {text} <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuestionSuggestions({ onSelectSuggestion }: SuggestionProps) {
  const questions = ["Generate a cold message", "Improve my summary", "Analyze a job description", "Create a follow-up email"];
  return (
    <div className="flex flex-col gap-4">
      <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Sugestões de Perguntas</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button 
            key={i} 
            onClick={() => onSelectSuggestion(q)}
            className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#111C3A] text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-[#1C233D] transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RecentDocuments() {
  const [docs, setDocs] = useState<string[]>(["resume_v1.pdf", "resume_v2.pdf", "resume_v3.pdf"]);
  
  // Inicialização explícita e limpa do useRef para evitar conflitos no Next.js
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveDoc = (e: React.MouseEvent, indexToRemove: number) => {
    e.stopPropagation(); // Impede que clicar na lixeira tente abrir os arquivos do PC
    setDocs(prevDocs => prevDocs.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFileName = files[0].name;
      setDocs(prevDocs => [...prevDocs, newFileName]);
      event.target.value = ""; 
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Botão de área invisível sobre o título e ícone original */}
      <button 
        onClick={triggerUpload}
        className="w-full flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 text-left cursor-pointer group/doc focus:outline-none"
      >
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500 group-hover/doc:text-[#00A3FF] transition-colors">
          Documents Recentes
        </h2>
        <FileText className="w-4 h-4 text-slate-400 group-hover/doc:text-[#00A3FF] transition-colors" />
      </button>

      {/* Input nativo invisível */}
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
      />

      <div className="flex flex-col gap-1">
        {docs.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">Nenhum documento recente.</p>
        ) : (
          docs.map((doc, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-[#111C3A] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <File className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium truncate">{doc}</span>
              </div>
              
              <button
                onClick={(e) => handleRemoveDoc(e, i)}
                title="Remover documento"
                className="p-1.5 rounded-md border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors ml-2 shrink-0 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}