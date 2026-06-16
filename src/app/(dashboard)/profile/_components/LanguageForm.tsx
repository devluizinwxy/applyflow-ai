"use client";

import { Plus } from "lucide-react";

export default function LanguageForm() {
  const languages = [
    {
      id: 1,
      name: "English",
      level: "Advanced",
    },
  ];

  return (
    <div className="w-full">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Languages
        </h2>

        <button
          className="
          w-8
          h-8
          rounded-xl
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          flex
          items-center
          justify-center
          text-slate-700
          dark:text-slate-300
          "
        >
          <Plus size={14} />
        </button>

      </div>

      <div className="space-y-3">

        {languages.map((lang) => (
          <div
            key={lang.id}
            className="border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0"
          >
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {lang.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {lang.level}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}