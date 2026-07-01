"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Settings, FileText, ChevronRight, File, Sun, Moon } from 'lucide-react';

interface SuggestionProps {
  onSelectSuggestion?: (text: string) => void;
}

export function SuggestionsList({ onSelectSuggestion }: SuggestionProps) {
  const suggestions = ["Improve summary clarity", "Quantify bullet points", "A/B test different job titles"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se o usuário clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setTheme = (theme: 'light' | 'dark') => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 relative">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Suggestions List</h2>
        
        {/* Container da engrenagem + menu flutuante */}
        <div ref={menuRef} className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Configurações de Tema"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C233D] transition-colors focus:outline-none group"
          >
            <Settings className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </button>

          {/* Telinha pequena com as opções de Sol e Lua */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#111C3A] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              <button 
                onClick={() => setTheme('light')}
                className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C233D] flex items-center gap-2 transition-colors"
              >
                <Sun size={14} className="text-amber-500" /> Modo Claro
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1C233D] flex items-center gap-2 transition-colors"
              >
                <Moon size={14} className="text-indigo-400" /> Modo Noturno
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {suggestions.map((text, i) => (
          <button 
            key={i} 
            onClick={() => onSelectSuggestion?.(text)}
            className="w-full text-left px-4 py-2.5 bg-slate-50 dark:bg-[#111C3A] hover:bg-slate-100 dark:hover:bg-[#1C233D] rounded-xl text-sm text-slate-700 dark:text-slate-300 transition-colors flex justify-between items-center group"
          >
            {text} <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
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
            onClick={() => onSelectSuggestion?.(q)}
            className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#111C3A] text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-[#1C233D] transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RecentDocuments() {
  const docs = ["resume_v1.pdf", "resume_v2.pdf", "resume_v3.pdf"];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Documents Recentes</h2>
        <FileText className="w-4 h-4 text-slate-400" />
      </div>
      <div className="flex flex-col gap-1">
        {docs.map((doc, i) => (
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-[#111C3A] rounded-lg cursor-pointer transition-colors group">
            <File className="w-4 h-4 text-slate-400 group-hover:text-[#00A3FF] transition-colors" />
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}