"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, FileText, Building2, Calendar } from "lucide-react";

interface ApplicationDetail {
  id: number;
  role: string;
  company: string;
  date: string;
  status: "SENT" | "INTERVIEW" | "REJECTED";
}

interface ApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationsModal({ isOpen, onClose }: ApplicationsModalProps) {
  if (!isOpen) return null;

  const monthlyApplications: ApplicationDetail[] = [
    { id: 1, role: "Senior Frontend Engineer", company: "TechGlobal Inc", date: "Hoje, 18:45", status: "SENT" },
    { id: 2, role: "React Developer", company: "Stripe Group", date: "Hoje, 14:20", status: "SENT" },
    { id: 3, role: "Frontend UI Specialist", company: "Vercel Enterprise", date: "Ontem", status: "INTERVIEW" },
    { id: 4, role: "Software Engineer III", company: "Cyberdyne Systems", date: "21 de Junho", status: "REJECTED" },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-150">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText className="h-6 w-6" /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Histórico de Envios</h3>
              <p className="text-sm text-slate-500">Últimas vagas aplicadas automaticamente este mês.</p>
            </div>
          </div>

          <div className="border-t border-slate-100 my-2 pt-2 max-h-[300px] overflow-y-auto space-y-3 pr-1">
            {monthlyApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">{app.role}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {app.company}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {app.date}</span>
                  </div>
                </div>
                <Badge className={`${app.status === 'SENT' ? 'bg-sky-500' : app.status === 'INTERVIEW' ? 'bg-amber-500' : 'bg-rose-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded border-transparent`}>
                  {app.status}
                </Badge>
              </div>
            ))}
          </div>

          <Button onClick={onClose} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl mt-2">
            Fechar Visualização
          </Button>
        </div>
      </div>
    </div>
  );
}