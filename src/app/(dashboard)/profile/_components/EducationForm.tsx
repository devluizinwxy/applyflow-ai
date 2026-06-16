"use client";

import { Edit2, Plus, Trash2 } from "lucide-react";

export default function EducationForm() {
  const education = [
    {
      id: 1,
      title: "Education School",
      period: "2022 - 2023",
    },
    {
      id: 2,
      title: "Education Graduate",
      period: "2020 - 2021",
    },
  ];

  return (
    <div className="w-full">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Education
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

        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-3 last:border-0"
          >
            <div>

              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {edu.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {edu.period}
              </p>

            </div>

            <div className="flex gap-2">

              <button
                className="
                px-2.5
                py-1
                rounded-xl
                border
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                text-xs
                flex
                items-center
                gap-1
                "
              >
                <Edit2 size={12} />
                Edit
              </button>

              <button
                className="
                px-2.5
                py-1
                rounded-xl
                border
                border-red-300
                dark:border-red-900
                bg-red-50
                dark:bg-red-950/40
                text-red-500
                text-xs
                flex
                items-center
                gap-1
                "
              >
                <Trash2 size={12} />
                Remove
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}