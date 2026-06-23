"use client";

import { DashboardView } from "@/components/dashboard/dashboardview";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8 pt-6 bg-[#f8fafc] min-h-screen text-slate-900">
      <DashboardView />
    </div>
  );
}