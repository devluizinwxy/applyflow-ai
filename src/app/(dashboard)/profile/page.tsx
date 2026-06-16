"use client";

import ProfileForm from "./_components/ProfileForm";
import ResumeUploader from "./_components/ResumeUploader";
import ExperienceForm from "./_components/ExperienceForm";
import EducationForm from "./_components/EducationForm";
import LanguageForm from "./_components/LanguageForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen px-6 py-6 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">

      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Your Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your professional information for job applications.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-10 mb-10">

        {/* Personal Info */}
        <div className="border-b border-slate-300 dark:border-slate-700">
          <button className="pb-3 text-sm font-medium border-b-2 border-sky-500 text-sky-500">
            Personal Info
          </button>
        </div>

        {/* Resume e Experience */}
        <div className="flex justify-around border-b border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300">
          <button className="pb-3 hover:text-sky-500 transition-colors">
            Resume
          </button>

          <button className="pb-3 hover:text-sky-500 transition-colors">
            Experience
          </button>
        </div>

        {/* Education e Languages */}
        <div className="flex justify-around border-b border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300">
          <button className="pb-3 hover:text-sky-500 transition-colors">
            Education
          </button>

          <button className="pb-3 hover:text-sky-500 transition-colors">
            Languages
          </button>
        </div>

      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">

        {/* Coluna esquerda */}
        <ProfileForm />

        {/* Coluna central */}
        <ResumeUploader />

        {/* Coluna direita */}
        <div className="space-y-12">
          <ExperienceForm />
          <EducationForm />
          <LanguageForm />
        </div>

      </div>

    </div>
  );
}