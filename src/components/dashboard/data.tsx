import { FileText, Database, Award } from "lucide-react";

export interface ActivityItem {
  id: number;
  type: string;
  title: string;
  time: string;
  icon: React.ReactNode;
  bgIcon: string;
  badgeClass: string;
  details: string;
}

export const miniBarData = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 60 }, { v: 40 }, 
  { v: 70 }, { v: 85 }, { v: 50 }, { v: 65 }, { v: 40 }
];

export const mockActivities: ActivityItem[] = [
  {
    id: 1,
    type: "SENT",
    title: "Application sent for Frontend Engineer at Vercel",
    time: "10m ago",
    icon: <FileText className="h-5 w-5" />,
    bgIcon: "bg-sky-50 text-sky-600",
    badgeClass: "bg-sky-500",
    details: "Seu currículo otimizado por IA foi enviado com sucesso através do portal de carreiras da Vercel para a vaga de Senior Frontend Engineer."
  },
  {
    id: 2,
    type: "DONE",
    title: "Automation [US Campaign] completed for today",
    time: "2h ago",
    icon: <Database className="h-5 w-5" />,
    bgIcon: "bg-emerald-50 text-emerald-600",
    badgeClass: "bg-emerald-600",
    details: "A varredura diária terminou. Foram analisadas 45 novas vagas, das quais 12 deram match ideal com o seu perfil profissional."
  },
  {
    id: 3,
    type: "OFFER",
    title: "Offer received from Stripe",
    time: "3h ago",
    icon: <Award className="h-5 w-5" />,
    bgIcon: "bg-amber-50 text-amber-600",
    badgeClass: "bg-amber-500",
    details: "Parabéns! Uma proposta formal foi identificada na sua caixa de entrada vinda do RH da Stripe. Resposta recomendada em até 48h."
  }
];