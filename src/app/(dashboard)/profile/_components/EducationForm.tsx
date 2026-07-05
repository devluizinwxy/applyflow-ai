"use client";

import { useState } from "react";
import { Edit2, Plus, Trash2, Check, X } from "lucide-react";

interface EducationItem {
  id: number;
  title: string;
  period: string;
}

export default function EducationForm() {
  const [education, setEducation] = useState<EducationItem[]>([
    { id: 1, title: "Education School", period: "2022 - 2023" },
    { id: 2, title: "Education Graduate", period: "2020 - 2021" },
  ]);

  // Estados para controle de Edição / Criação
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Estados temporários dos inputs
  const [tempTitle, setTempTitle] = useState("");
  const [tempPeriod, setTempPeriod] = useState("");

  // Iniciar a edição de um item existente
  const handleStartEdit = (edu: EducationItem) => {
    setEditingId(edu.id);
    setIsAdding(false);
    setTempTitle(edu.title);
    setTempPeriod(edu.period);
  };

  // Iniciar a criação de um item novo
  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setTempTitle("");
    setTempPeriod("");
  };

  // Salvar alteração ou novo item
  const handleSave = () => {
    if (!tempTitle.trim() || !tempPeriod.trim()) return;

    if (isAdding) {
      // Adicionar novo
      const newItem: EducationItem = {
        id: Date.now(),
        title: tempTitle,
        period: tempPeriod,
      };
      setEducation([...education, newItem]);
      setIsAdding(false);
    } else if (editingId !== null) {
      // Salvar edição
      setEducation(
        education.map((edu) =>
          edu.id === editingId ? { ...edu, title: tempTitle, period: tempPeriod } : edu
        )
      );
      setEditingId(null);
    }

    // Limpa campos
    setTempTitle("");
    setTempPeriod("");
  };

  // Remover Item
  const handleRemove = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Education</h2>
        
        {!isAdding && editingId === null && (
          <button
            onClick={handleStartAdd}
            className="w-8 h-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Plus size={14} />
          </button>
        )}
      </div>

      {/* Formulário Inline de Edição ou Criação */}
      {(isAdding || editingId !== null) && (
        <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {isAdding ? "Add Education" : "Edit Education"}
          </span>
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              placeholder="School / Course Title"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="text"
              placeholder="Period (e.g., 2022 - 2023)"
              value={tempPeriod}
              onChange={(e) => setTempPeriod(e.target.value)}
              className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setEditingId(null); setIsAdding(false); }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs flex items-center gap-1 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50"
            >
              <X size={12} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-2.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-xs flex items-center gap-1 transition-colors"
            >
              <Check size={12} /> Save
            </button>
          </div>
        </div>
      )}

      {/* Lista de Itens */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{edu.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{edu.period}</p>
            </div>

            {editingId !== edu.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartEdit(edu)}
                  className="px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Edit2 size={12} /> Edit
                </button>

                <button
                  onClick={() => handleRemove(edu.id)}
                  className="px-2.5 py-1 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-500 text-xs flex items-center gap-1 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}