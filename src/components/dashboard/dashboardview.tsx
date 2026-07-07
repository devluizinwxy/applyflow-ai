"use client";

import { useState } from "react";
import { useDashboard } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Rocket, ExternalLink, X } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

import { ApplicationsModal } from "./modals/applications-modal";
import { AutomationModal } from "./modals/automation-modal";
import { mockActivities, miniBarData, ActivityItem } from "./data";

export function DashboardView() {
  const { metrics, isLoading } = useDashboard();
  
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[160px] w-full rounded-2xl dark:bg-slate-800" />
          <Skeleton className="h-[160px] w-full rounded-2xl dark:bg-slate-800" />
          <Skeleton className="h-[160px] w-full rounded-2xl dark:bg-slate-800 sm:col-span-2 lg:col-span-1" />
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-12">
          <Skeleton className="h-[350px] lg:col-span-7 rounded-2xl dark:bg-slate-800" />
          <Skeleton className="h-[200px] lg:col-span-5 rounded-2xl dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  const successRate = metrics?.successRate || 68;
  const pieData = [{ value: successRate }, { value: 100 - successRate }];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Responsivo */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-2 bg-[#e8f7ed] dark:bg-emerald-950/30 border border-[#bbf7d0] dark:border-emerald-900/50 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 self-start sm:self-auto">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-[#166534] dark:text-emerald-400">
            System Status: <span className="font-bold">Active</span>
          </span>
        </div>
      </div>

      {/* Grid de 3 Cards - Ajustado para quebrar bonito no Tablet e Celular */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1 */}
        <div 
          onClick={() => setIsApplicationsOpen(true)}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-col justify-between h-[160px] sm:h-[175px] cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group duration-200"
        >
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Applications Sent (Month)
              </h3>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1 sm:mt-2 tracking-tight">
              {(metrics?.totalApplied || 1245).toLocaleString()}
            </p>
            <div className="inline-flex items-center gap-1 bg-[#e8f7ed] dark:bg-emerald-500/10 text-[#166534] dark:text-emerald-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md mt-1.5 sm:mt-2">
              ↑ +15% vs last month
            </div>
          </div>
          <div className="h-6 sm:h-8 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={miniBarData}>
                <Bar dataKey="v" fill="#38bdf8" radius={[2, 2, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex items-center justify-between h-[160px] sm:h-[175px]">
          <div className="flex flex-col justify-between h-full py-1">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Active Automations</h3>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">3 Active</p>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full w-fit font-medium mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" /> 5 Paused
            </div>
          </div>
          <Database className="h-10 w-10 sm:h-14 sm:w-14 text-slate-300 dark:text-slate-700 stroke-[1.2]" />
        </div>

        {/* Card 3 - Esticado no tablet se faltar espaço, 1/3 no desktop */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex items-center justify-between h-[160px] sm:h-[175px] sm:col-span-2 lg:col-span-1">
          <div className="flex flex-col justify-between h-full py-1">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Success Rate</h3>
            <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{successRate}%</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">92 total offers</p>
          </div>
          <div className="h-16 w-16 sm:h-20 sm:w-20 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={20} outerRadius={30} startAngle={90} endAngle={-270} dataKey="value">
                  <Cell fill="#3b82f6" strokeWidth={0} />
                  <Cell fill="#e2e8f0" className="dark:fill-slate-800" strokeWidth={0} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Seção Inferior */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-12 items-start">
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-4 sm:p-6 shadow-sm lg:col-span-7 xl:col-span-8">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">Recent Activity</h3>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mb-4">Clique em uma linha para inspecionar.</p>
          
          <div className="space-y-2 sm:space-y-3 max-h-[280px] sm:max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
            {mockActivities.map((act: ActivityItem) => (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className="flex items-center justify-between p-2 sm:p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors border border-transparent dark:border-transparent cursor-pointer group"
              >
                <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                  <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${act.bgIcon} dark:bg-opacity-20`}>{act.icon}</div>
                  <div className="truncate">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {act.title}
                    </p>
                    <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">{act.time}</span>
                  </div>
                </div>
                <Badge className={`${act.badgeClass} text-white font-bold text-[10px] sm:text-xs border-transparent shadow-none flex-shrink-0 ml-2`}>
                  {act.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Lateral */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center justify-center py-10 sm:py-14 border border-dashed border-slate-300/80 dark:border-slate-800 rounded-2xl space-y-3 self-stretch">
          <Button onClick={() => setIsAutomationOpen(true)} className="bg-[#3b82f6] hover:bg-[#2563eb] dark:hover:bg-blue-600 text-white font-semibold text-sm sm:text-md px-4 sm:px-6 py-4 sm:py-5 rounded-xl shadow-sm flex items-center gap-2 active:scale-95 transition-transform w-11/12 sm:w-auto">
            <Rocket className="h-4 w-4 fill-white flex-shrink-0" /> Start New Automation
          </Button>
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium text-center px-4">
            Engine is ready. Last config: 2h ago.
          </p>
        </div>
      </div>

      <ApplicationsModal isOpen={isApplicationsOpen} onClose={() => setIsApplicationsOpen(false)} />
      <AutomationModal isOpen={isAutomationOpen} onClose={() => setIsAutomationOpen(false)} />

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl border dark:border-slate-800 relative animate-in fade-in zoom-in-95 duration-150">
            <button onClick={() => setSelectedActivity(null)} className="absolute right-3 top-3 sm:right-4 sm:top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-lg">
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-4 pt-2 sm:pt-0">
              <Badge className={`${selectedActivity.badgeClass} text-white font-bold`}>{selectedActivity.type}</Badge>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{selectedActivity.title}</h3>
              <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {selectedActivity.details}
              </div>
              <Button onClick={() => setSelectedActivity(null)} className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-slate-800 rounded-xl h-10 sm:h-11">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}