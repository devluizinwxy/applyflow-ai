"use client";

import { DashboardView } from "@/components/dashboard/dashboardview";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8 pt-6 bg-[#f8fafc] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <DashboardView />
    </div>
  );
}