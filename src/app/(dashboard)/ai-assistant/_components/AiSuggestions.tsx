"use client";

import React from 'react';
import { Settings, FileText, ChevronRight, File } from 'lucide-react';

export function SuggestionsList() {
  const suggestions = ["Improve summary clarity", "Quantify bullet points", "A/B test different job titles"];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Suggestions List</h2>
        <Settings className="w-4 h-4 text-slate-400" />
      </div>
      <div className="flex flex-col gap-2">
        {suggestions.map((text, i) => (
          <button key={i} className="w-full text-left px-4 py-2.5 bg-slate-50 dark:bg-[#111C3A] hover:bg-slate-100 dark:hover:bg-[#1C233D] rounded-xl text-sm text-slate-700 dark:text-slate-300 transition-colors flex justify-between items-center">
            {text} <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function QuestionSuggestions() {
  const questions = ["Generate a cold message", "Improve my summary", "Analyze a job description", "Create a follow-up email"];
  return (
    <div className="flex flex-col gap-4">
      <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold tracking-wider uppercase text-slate-400 dark:text-slate-500">Sugestões de Perguntas</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, i) => (
          <button key={i} className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#111C3A] text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-[#1C233D] transition-colors">
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
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-[#111C3A] rounded-lg cursor-pointer transition-colors">
            <File className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}