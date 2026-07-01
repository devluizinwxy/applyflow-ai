"use client";

import { useState, useRef } from "react";
import { FileText, MoreVertical, Upload, Plus, Trash2, Download, Eye, X } from "lucide-react";

export default function ResumeUploader() {
  const [resumes, setResumes] = useState([
    { id: 1, name: "CV 1", size: "3.1 MB", ext: "texss.cv", active: true },
    { id: 2, name: "CV 2", size: "2.1 MB", ext: "texss.cv", active: false },
  ]);

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCVName, setNewCVName] = useState("");
  
  // Referência para acionar o input escondido do PC
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = (id: number) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleAddResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCVName) {
      setResumes([...resumes, {
        id: Date.now(),
        name: newCVName,
        size: "1.5 MB",
        ext: "pdf.cv",
        active: false
      }]);
      setNewCVName("");
      setIsModalOpen(false);
    }
  };

  // Função que roda quando você escolhe um arquivo do PC
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Converte o tamanho para MB amigável
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const fileExt = file.name.split('.').pop() || 'cv';

      setResumes([...resumes, {
        id: Date.now(),
        name: file.name.replace(`.${fileExt}`, ""),
        size: `${fileSizeMB} MB`,
        ext: `${fileExt}.cv`,
        active: false
      }]);
    }
  };

  const handleRemoveResume = (id: number) => {
    setResumes(resumes.filter(r => r.id !== id));
    setActiveMenuId(null);
  };

  return (
    <div className="w-full relative">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resume</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-9 h-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {resumes.map((cv) => (
          <div
            key={cv.id}
            className={`rounded-2xl p-4 flex justify-between items-center transition-colors relative ${
              cv.active ? "bg-sky-50 dark:bg-sky-900/20" : ""
            }`}
          >
            <div className="flex gap-3">
              <div className="flex items-center justify-center">
                <FileText size={22} className={cv.active ? "text-sky-500" : "text-slate-400"} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{cv.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {cv.size} · {cv.ext}
                </p>
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => toggleMenu(cv.id)} 
                className="text-slate-500 dark:text-slate-400 p-1 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <MoreVertical size={18} />
              </button>

              {/* Menu Flutuante das Opções */}
              {activeMenuId === cv.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    CV Actions
                  </div>
                  <button 
                    onClick={() => { alert("Viewing..."); setActiveMenuId(null); }}
                    className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Eye size={13} className="text-slate-400" /> View details
                  </button>
                  <button 
                    onClick={() => { alert("Downloading..."); setActiveMenuId(null); }}
                    className="w-full px-3 py-2 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <Download size={13} className="text-slate-400" /> Download
                  </button>
                  <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                  <button 
                    onClick={() => handleRemoveResume(cv.id)}
                    className="w-full px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2"
                  >
                    <Trash2 size={13} /> Delete CV
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Input Invisível para abrir a janela do PC */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          className="hidden" 
        />

        {/* Zona de Upload Interativa */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="h-56 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/40 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-sky-500 dark:hover:border-sky-400 transition-colors"
        >
          <Upload size={28} className="text-slate-400" />
          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Upload profile</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Click to select files from PC</p>
          </div>
        </div>
      </div>

      {/* Modal para Adicionar Manual */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Resume</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddResume} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Resume Name</label>
                <input
                  type="text"
                  required
                  value={newCVName}
                  onChange={(e) => setNewCVName(e.target.value)}
                  placeholder="e.g. CV 3 - English version"
                  className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                />
              </div>
              <button type="submit" className="w-full h-10 bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm rounded-xl transition-colors">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}