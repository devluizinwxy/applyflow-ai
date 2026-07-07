"use client";

import { DashboardView } from "@/components/dashboard/dashboardview";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 md:ml-24 bg-[#f8fafc] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-200 overflow-x-hidden">
      <DashboardView />
    </div>
  );
}