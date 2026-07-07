"use client";

import ProfileForm from "./_components/ProfileForm";
import ResumeUploader from "./_components/ResumeUploader";
import ExperienceForm from "./_components/ExperienceForm";
import EducationForm from "./_components/EducationForm";
import LanguageForm from "./_components/LanguageForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      
      {/* Cabeçalho */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Your Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your professional information for job applications.
        </p>
      </div>

      {/* Identificadores das Colunas - Escondidos no Mobile (hidden), visíveis a partir de xl (xl:grid) */}
      <div className="hidden xl:grid grid-cols-3 gap-10 mb-10 border-b border-slate-200 dark:border-slate-800 pb-3">
        
        {/* Coluna 1 */}
        <div className="flex justify-start">
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Personal Info
          </span>
        </div>

        {/* Coluna 2 */}
        <div className="flex justify-around text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <span>Resume</span>
          <span>Experience</span>
        </div>

        {/* Coluna 3 */}
        <div className="flex justify-around text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <span>Education</span>
          <span>Languages</span>
        </div>

      </div>

      {/* Conteúdo das Colunas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12 items-start">

        {/* Coluna esquerda */}
        <div className="w-full">
          <ProfileForm />
        </div>

        {/* Coluna central */}
        <div className="w-full">
          <ResumeUploader />
        </div>

        {/* Coluna direita */}
        <div className="w-full space-y-8 xl:space-y-12">
          <ExperienceForm />
          <EducationForm />
          <LanguageForm />
        </div>

      </div>

    </div>
  );
}