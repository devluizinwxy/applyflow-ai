"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

export default function LanguageForm() {
  const [languages, setLanguages] = useState([
    { id: 1, name: "English", level: "Advanced" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newLevel) {
      setLanguages([...languages, { id: Date.now(), name: newName, level: newLevel }]);
      setNewName("");
      setNewLevel("");
      setIsModalOpen(false);
    }
  };

  const handleRemove = (id: number) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Languages</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-8 h-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {languages.map((lang) => (
          <div key={lang.id} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{lang.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{lang.level}</p>
            </div>
            <button 
              onClick={() => handleRemove(lang.id)}
              className="text-red-500 hover:text-red-700 p-1 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Janelinha (Modal) para Adicionar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Language</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Language</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Spanish"
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Proficiency Level</label>
                <input
                  type="text"
                  required
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  placeholder="e.g. Intermediate / Native"
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                />
              </div>
              <button type="submit" className="w-full h-10 bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm rounded-xl transition-colors">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}