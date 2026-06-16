"use client";

import { FileText, MoreVertical, Upload, Plus } from "lucide-react";

export default function ResumeUploader() {
  return (
    <div className="w-full">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Resume
        </h2>

        <button
          className="
          w-9
          h-9
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
          hover:bg-slate-50
          dark:hover:bg-slate-700
          transition-colors
          "
        >
          <Plus size={16} />
        </button>

      </div>

      <div className="space-y-4">

        {/* CV ativo */}
        <div
          className="
          bg-sky-50
          dark:bg-sky-900/20
          rounded-2xl
          p-4
          flex
          justify-between
          items-center
          transition-colors
          "
        >
          <div className="flex gap-3">

            <div className="flex items-center justify-center">
              <FileText
                size={22}
                className="text-sky-500"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                CV 1
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                3.1 MB · texss.cv
              </p>
            </div>

          </div>

          <button className="text-slate-500 dark:text-slate-400">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* CV secundário */}
        <div
          className="
          p-4
          rounded-2xl
          flex
          justify-between
          items-center
          "
        >
          <div className="flex gap-3">

            <div className="flex items-center justify-center">
              <FileText
                size={22}
                className="text-slate-400"
              />
            </div>

            <div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                CV 2
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                2.1 MB · texss.cv
              </p>

            </div>

          </div>

          <button className="text-slate-500 dark:text-slate-400">
            <MoreVertical size={18} />
          </button>

        </div>

        {/* Upload */}
        <div
          className="
          h-56
          border-2
          border-dashed
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800/40
          rounded-3xl
          flex
          flex-col
          items-center
          justify-center
          gap-4
          transition-colors
          "
        >

          <Upload
            size={28}
            className="text-slate-400"
          />

          <div className="text-center">

            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Upload profile
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Drag & drop files here
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}