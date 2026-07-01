"use client";

import { useState } from "react";
import { Edit2, Plus, Trash2, X } from "lucide-react";

export default function EducationForm() {
  const [education, setEducation] = useState([
    { id: 1, title: "Education School", period: "2022 - 2023" },
    { id: 2, title: "Education Graduate", period: "2020 - 2021" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPeriod, setNewPeriod] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle && newPeriod) {
      setEducation([...education, { id: Date.now(), title: newTitle, period: newPeriod }]);
      setNewTitle("");
      setNewPeriod("");
      setIsModalOpen(false);
    }
  };

  const handleRemove = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Education</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-8 h-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{edu.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{edu.period}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-2.5 py-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs flex items-center gap-1">
                <Edit2 size={12} /> Edit
              </button>
              <button
                onClick={() => handleRemove(edu.id)}
                className="px-2.5 py-1 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-500 text-xs flex items-center gap-1 hover:bg-red-100 transition-colors"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Janelinha (Modal) para Adicionar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add Education</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">School / Course</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Harvard University"
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Period</label>
                <input
                  type="text"
                  required
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value)}
                  placeholder="e.g. 2022 - 2024"
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